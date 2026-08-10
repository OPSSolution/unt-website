import type { ContentLanguage, Translations } from "../../i18n.js";
import { supabase } from "../../supabase.js";

const SHARED_FIELD = /(^id$|_id$|^origin$|image|avatar|url|flag|created_at|updated_at|sort_order|featured|available)/i;

export function partitionLocalizedBody(body: Record<string, unknown>) {
  const shared: Record<string, unknown> = {};
  const translated: Record<string, unknown> = {};
  Object.entries(body).forEach(([key, value]) => {
    (SHARED_FIELD.test(key) ? shared : translated)[key] = value;
  });
  return { shared, translated };
}

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
  const { shared, translated } = partitionLocalizedBody(body);
  return supabase.from(table).update({
    // Media and other structural fields are canonical and must update even
    // when the admin is currently editing Khmer content.
    ...shared,
    translations: { ...translations, km: translated },
    ...extra,
  }).eq("id", id).select().single();
}
