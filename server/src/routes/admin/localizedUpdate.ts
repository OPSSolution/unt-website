import type { ContentLanguage, Translations } from "../../i18n.js";
import { supabase } from "../../supabase.js";

export async function localizedUpdate(
  table: string,
  id: string,
  body: Record<string, unknown>,
  language: ContentLanguage,
  extra: Record<string, unknown> = {},
) {
  if (language === "en") {
    return supabase.from(table).update({ ...body, ...extra }).eq("id", id).select().single();
  }
  const { data: current, error: readError } = await supabase
    .from(table).select("translations").eq("id", id).single();
  if (readError) return { data: null, error: readError };
  const translations = (current?.translations ?? {}) as Translations;
  return supabase.from(table).update({
    translations: { ...translations, km: body },
    ...extra,
  }).eq("id", id).select().single();
}
