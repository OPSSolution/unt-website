import { Router } from "express";
import { supabase } from "../../supabase.js";

const router = Router();

router.get("/breakdown", async (_req, res) => {
  const [daily, countries, types] = await Promise.all([
    supabase.rpc("site_visits_daily", { days: 30 }),
    supabase.rpc("site_visits_countries"),
    supabase.rpc("site_visits_types"),
  ]);
  if (daily.error) return res.status(500).json({ error: daily.error.message });
  if (countries.error) return res.status(500).json({ error: countries.error.message });
  if (types.error) return res.status(500).json({ error: types.error.message });

  const newVisitors = types.data?.find((row: { is_new: boolean }) => row.is_new)?.visits ?? 0;
  const returningVisitors = types.data?.find((row: { is_new: boolean }) => !row.is_new)?.visits ?? 0;

  return res.json({
    daily: (daily.data ?? []).map((row: { day: string; visits: number }) => ({ date: row.day, visits: Number(row.visits) })),
    countries: (countries.data ?? []).map((row: { country: string; visits: number }) => ({ country: row.country, visits: Number(row.visits) })),
    newVisitors: Number(newVisitors),
    returningVisitors: Number(returningVisitors),
  });
});

export default router;
