import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Data persistence directory inside the container
  const DATA_DIR = path.join(process.cwd(), "data");
  const SYNC_FILE = path.join(DATA_DIR, "presentation_sync.json");

  // Ensure data directory exists
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn("Could not create data dir:", err);
  }

  // Support up to 50MB JSON payload for embedded charts & high-res graphics
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // CORS headers so different domains (ais-dev vs ais-pre) can sync directly
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
  });

  // GET /api/sync - Retrieve the latest synchronized presentation state
  app.get("/api/sync", (req, res) => {
    try {
      if (fs.existsSync(SYNC_FILE)) {
        const fileData = fs.readFileSync(SYNC_FILE, "utf-8");
        const parsed = JSON.parse(fileData);
        return res.json({ success: true, data: parsed });
      }
      return res.json({ success: true, data: null, message: "No synced data found yet" });
    } catch (err) {
      console.error("Error reading sync file:", err);
      return res.status(500).json({ success: false, error: "Failed to read sync data" });
    }
  });

  // POST /api/sync - Store and broadcast the synchronized presentation state
  app.post("/api/sync", (req, res) => {
    try {
      const payload = req.body;
      if (!payload || typeof payload !== "object") {
        return res.status(400).json({ success: false, error: "Invalid payload" });
      }

      const syncData = {
        version: 1,
        timestamp: Date.now(),
        source: req.headers["x-client-source"] || "web-client",
        ...payload
      };

      fs.writeFileSync(SYNC_FILE, JSON.stringify(syncData), "utf-8");
      console.log(`[Sync] Presentation data successfully saved at ${new Date(syncData.timestamp).toISOString()}`);
      return res.json({ success: true, timestamp: syncData.timestamp });
    } catch (err) {
      console.error("Error writing sync file:", err);
      return res.status(500).json({ success: false, error: "Failed to save sync data" });
    }
  });

  // POST /api/sync/reset - Clear synchronized presentation state
  app.post("/api/sync/reset", (req, res) => {
    try {
      if (fs.existsSync(SYNC_FILE)) {
        fs.unlinkSync(SYNC_FILE);
      }
      return res.json({ success: true, message: "Sync data reset" });
    } catch (err) {
      console.error("Error resetting sync file:", err);
      return res.status(500).json({ success: false, error: "Failed to reset sync data" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Presentation Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
