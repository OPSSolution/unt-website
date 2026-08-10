import { Router } from "express";
import { supabase } from "../../supabase.js";
import { validateBody, validateParams } from "../../middleware/validate.js";
import { sectionParamsSchema } from "../../schemas/common.js";
import { homepageSectionSchema } from "../../schemas/content.js";
import { requestLanguage } from "../../i18n.js";
const router = Router();
const SHARED_SECTION_FIELD = /image|avatar|url|flag/i;
router.put("/:key", validateParams(sectionParamsSchema), validateBody(homepageSectionSchema), async (req, res) => {
  const language = requestLanguage(req);
  const { data: existing, error: readError } = await supabase.from("homepage_sections")
    .select("data").eq("section_key", req.params.key).maybeSingle();
  if (readError) return res.status(400).json({ error: readError.message });
  const current = existing?.data && typeof existing.data === "object" ? existing.data as Record<string, unknown> : {};
  const alreadyLocalized = "en" in current || "km" in current;
  const english = alreadyLocalized ? current.en ?? {} : current;
  const khmer = alreadyLocalized ? current.km ?? {} : {};
  const localizedData = language === "km"
    ? (() => {
        const shared: Record<string, unknown> = {};
        const translated: Record<string, unknown> = {};
        Object.entries(req.body).forEach(([key, value]) => {
          (SHARED_SECTION_FIELD.test(key) ? shared : translated)[key] = value;
        });
        // Images are shared page structure. Uploading while Khmer is selected
        // must update the canonical English-backed section for both languages.
        return { en: { ...(english as Record<string, unknown>), ...shared }, km: translated };
      })()
    : { en: req.body, km: khmer };
  const { data, error } = await supabase.from("homepage_sections").upsert(
    { section_key: req.params.key, data: localizedData, updated_at: new Date().toISOString() },
    { onConflict: "section_key" },
  ).select().single();
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});
export default router;
