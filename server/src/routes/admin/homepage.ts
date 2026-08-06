import { Router } from "express";
import { supabase } from "../../supabase.js";
import { validateBody, validateParams } from "../../middleware/validate.js";
import { sectionParamsSchema } from "../../schemas/common.js";
import { homepageSectionSchema } from "../../schemas/content.js";
const router = Router();
router.put("/:key", validateParams(sectionParamsSchema), validateBody(homepageSectionSchema), async (req, res) => {
  const { data, error } = await supabase.from("homepage_sections").upsert(
    { section_key: req.params.key, data: req.body, updated_at: new Date().toISOString() },
    { onConflict: "section_key" },
  ).select().single();
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});
export default router;
