import { Router } from "express";
import { supabase } from "../../supabase.js";
import { validateBody, validateParams } from "../../middleware/validate.js";
import { idParamsSchema } from "../../schemas/common.js";
import { articleSchema } from "../../schemas/content.js";
import { requestLanguage } from "../../i18n.js";
import { localizedUpdate } from "./localizedUpdate.js";
const router = Router();
router.post("/", validateBody(articleSchema), async (req, res) => {
  if (requestLanguage(req) === "km") return res.status(400).json({ error: "Create the English article first, then add Khmer." });
  const { data, error } = await supabase.from("articles").insert(req.body).select().single();
  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json(data);
});
router.put("/:id", validateParams(idParamsSchema), validateBody(articleSchema.partial()), async (req, res) => {
  const { data, error } = await localizedUpdate("articles", String(req.params.id), req.body, requestLanguage(req), { updated_at: new Date().toISOString() });
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});
router.delete("/:id", validateParams(idParamsSchema), async (req, res) => {
  const { error } = await supabase.from("articles").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  return res.status(204).send();
});
export default router;
