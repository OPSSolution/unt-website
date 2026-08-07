import { Router } from "express";
import { supabase } from "../../supabase.js";
import { validateParams } from "../../middleware/validate.js";
import { idParamsSchema } from "../../schemas/common.js";
import { validateBody } from "../../middleware/validate.js";
import { quoteStatusSchema } from "../../schemas/content.js";

const router = Router();

router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data ?? []);
});

router.patch("/:id/status", validateParams(idParamsSchema), validateBody(quoteStatusSchema), async (req, res) => {
  const { data, error } = await supabase
    .from("quotes")
    .update({ status: req.body.status })
    .eq("id", req.params.id)
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});

router.delete("/:id", validateParams(idParamsSchema), async (req, res) => {
  const { error } = await supabase.from("quotes").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  return res.status(204).send();
});

export default router;
