import { Router } from "express";
import geoip from "geoip-lite";
import { supabase } from "../supabase.js";

const router = Router();

router.get("/", async (_req, res) => {
  const { data, error } = await supabase.from("site_stats").select("total_visits").eq("id", 1).single();
  if (error) return res.status(500).json({ error: error.message });
  return res.json({ totalVisits: data.total_visits });
});

router.post("/visit", async (req, res) => {
  const visitorId = req.body?.visitorId;
  if (typeof visitorId !== "string" || visitorId.length < 8 || visitorId.length > 100) {
    return res.status(400).json({ error: "Invalid visitorId" });
  }
  const country = geoip.lookup(req.ip ?? "")?.country ?? null;
  const { data, error } = await supabase.rpc("record_site_visit", { p_visitor_id: visitorId, p_country: country });
  if (error) return res.status(400).json({ error: error.message });
  const result = data?.[0] ?? { total_visits: null, is_new: null };
  return res.json({ totalVisits: result.total_visits, isNew: result.is_new });
});

export default router;
