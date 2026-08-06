import { Router } from "express";
import { supabase } from "../../supabase.js";
import { validateBody, validateLocalizedBody, validateParams } from "../../middleware/validate.js";
import { idParamsSchema } from "../../schemas/common.js";
import { productSchema } from "../../schemas/content.js";
import { requestLanguage } from "../../i18n.js";
import { localizedUpdate } from "./localizedUpdate.js";
const router = Router();
router.post("/", validateBody(productSchema), async (req, res) => {
  if (requestLanguage(req) === "km") return res.status(400).json({ error: "Create the English product first, then add Khmer." });
  const { data, error } = await supabase.from("products").insert(req.body).select().single();
  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json(data);
});
router.put("/:id", validateParams(idParamsSchema), validateLocalizedBody(productSchema.partial()), async (req, res) => {
  const { data, error } = await localizedUpdate("products", String(req.params.id), req.body, requestLanguage(req), { updated_at: new Date().toISOString() });
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});
router.delete("/:id", validateParams(idParamsSchema), async (req, res) => {
  const { error } = await supabase.from("products").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  return res.status(204).send();
});
export default router;
