import "dotenv/config";
import express from "express";
import cors from "cors";
import { supabase } from "./supabase.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server is running");
});

app.get("/api/health", async (_req, res) => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }

    return res.json({ ok: true, hasSession: Boolean(session) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Supabase error";
    return res.status(500).json({ ok: false, error: message });
  }
});

const PORT = Number(process.env.PORT ?? 5000);
const HOST = process.env.HOST ?? "localhost";
app.listen(PORT, () => console.log(`Server running on port http://${HOST}:${PORT}`));