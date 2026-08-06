import { Router } from "express";
import { supabase } from "../../supabase.js";
import { validateBody, validateParams } from "../../middleware/validate.js";
import { idParamsSchema } from "../../schemas/common.js";
import { heroContentSchema, heroStatSchema } from "../../schemas/content.js";
import { requestLanguage } from "../../i18n.js";
import { localizedUpdate } from "./localizedUpdate.js";
const router = Router();
router.put("/content", validateBody(heroContentSchema.partial().required({ id: true })), async (req, res) => {
  const { id, ...updates } = req.body;
  const { data, error } = await localizedUpdate("hero_content", id, updates, requestLanguage(req), { updated_at: new Date().toISOString() });
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});
router.put("/stats/:id", validateParams(idParamsSchema), validateBody(heroStatSchema.partial()), async (req, res) => {
  const { data, error } = await localizedUpdate("hero_stats", String(req.params.id), req.body, requestLanguage(req));
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});
export default router;
