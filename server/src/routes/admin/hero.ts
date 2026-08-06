import { Router } from "express";
import { supabase } from "../../supabase.js";
import { validateBody, validateParams } from "../../middleware/validate.js";
import { idParamsSchema } from "../../schemas/common.js";
import { heroContentSchema, heroStatSchema } from "../../schemas/content.js";
const router = Router();
router.put("/content", validateBody(heroContentSchema.partial().required({ id: true })), async (req, res) => {
  const { id, ...updates } = req.body;
  const { data, error } = await supabase.from("hero_content").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});
router.put("/stats/:id", validateParams(idParamsSchema), validateBody(heroStatSchema.partial()), async (req, res) => {
  const { data, error } = await supabase.from("hero_stats").update(req.body).eq("id", req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});
export default router;
