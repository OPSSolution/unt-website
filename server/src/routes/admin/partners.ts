import { Router } from "express";
import { supabase } from "../../supabase.js";
import { validateBody, validateParams } from "../../middleware/validate.js";
import { idParamsSchema } from "../../schemas/common.js";
import { partnerSchema } from "../../schemas/content.js";
const router = Router();
router.post("/", validateBody(partnerSchema), async (req, res) => {
  const { data, error } = await supabase.from("partners").insert(req.body).select().single();
  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json(data);
});
router.put("/:id", validateParams(idParamsSchema), validateBody(partnerSchema.partial()), async (req, res) => {
  const { data, error } = await supabase.from("partners").update(req.body).eq("id", req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});
router.delete("/:id", validateParams(idParamsSchema), async (req, res) => {
  const { error } = await supabase.from("partners").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  return res.status(204).send();
});
export default router;
