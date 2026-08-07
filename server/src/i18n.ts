import type { Request } from "express";
import type { RequestHandler } from "express";

export type ContentLanguage = "en" | "km";
export type Translations = Record<string, Record<string, unknown>>;

const SHARED_FIELD = /(^id$|_id$|image|avatar|url|flag|created_at|updated_at|sort_order|featured|available)/i;
const LEGAL_COMPANY_NAME = "Unique Noble Trading Co., Ltd.";

function replaceLegacyCompanyName(value: unknown): unknown {
  if (typeof value === "string") {
    return value
      .replace(/Unique Noble Trading Co\., Ltd\.\s*\(UNT Company\)/gi, LEGAL_COMPANY_NAME)
      .replace(/UNT Company/gi, LEGAL_COMPANY_NAME);
  }
  if (Array.isArray(value)) return value.map(replaceLegacyCompanyName);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .map(([key, field]) => [key, replaceLegacyCompanyName(field)]),
    );
  }
  return value;
}

function emptyLocalizedValue(key: string, value: unknown) {
  if (SHARED_FIELD.test(key) || typeof value === "number" || typeof value === "boolean" || value === null) return value;
  if (typeof value === "string") return "";
  if (Array.isArray(value)) return [];
  return value;
}

function blankLocalizedFields(value: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(value).map(([key, field]) => [key, emptyLocalizedValue(key, field)]));
}

function mergeSharedActivities(english: unknown, khmer: unknown) {
  if (!Array.isArray(english)) return Array.isArray(khmer) ? khmer : [];
  if (!Array.isArray(khmer) || khmer.length === 0) return english;
  const khmerById = new Map(khmer
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object" && !Array.isArray(item))
    .map((item) => [item.id, item]));
  return english.map((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return item;
    const base = item as Record<string, unknown>;
    const translated = khmerById.get(base.id) ?? khmer[index];
    return translated && typeof translated === "object" && !Array.isArray(translated)
      ? { ...base, ...translated }
      : base;
  });
}

export function requestLanguage(req: Request): ContentLanguage {
  const value = req.headers["x-content-language"] ?? req.query.lang;
  return value === "km" ? "km" : "en";
}

export const requireContentLanguage: RequestHandler = (req, res, next) => {
  const value = req.headers["x-content-language"];
  if (value !== "en" && value !== "km") {
    return res.status(400).json({ error: "Missing or invalid X-Content-Language header" });
  }
  next();
};

export const protectLanguageIntegrity: RequestHandler = (req, res, next) => {
  const language = req.headers["x-content-language"];
  if (language === "en" && /[\u1780-\u17ff]/u.test(JSON.stringify(req.body))) {
    return res.status(400).json({
      error: "English content contains Khmer script. Switch to Khmer before saving.",
    });
  }
  next();
};

export function localizeRow<T extends Record<string, unknown>>(row: T, language: ContentLanguage): T {
  const translations = (row.translations ?? {}) as Translations;
  const localized = language === "km" ? translations.km : undefined;
  const { translations: _translations, ...base } = row;
  return (language === "km"
    ? { ...blankLocalizedFields(base), ...(localized ?? {}) }
    : base) as T;
}

export function localizeRows<T extends Record<string, unknown>>(rows: T[] | null, language: ContentLanguage) {
  return (rows ?? []).map((row) => localizeRow(row, language));
}

export function localizedSection(data: unknown, language: ContentLanguage) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return data;
  const value = data as Record<string, unknown>;
  if (!("en" in value) && !("km" in value)) return replaceLegacyCompanyName(value);
  const english = value.en && typeof value.en === "object" ? value.en : {};
  const khmer = value.km && typeof value.km === "object" ? value.km : {};
  if (language !== "km") return replaceLegacyCompanyName(english);
  const localized = { ...blankLocalizedFields(english as Record<string, unknown>), ...khmer };
  if ("activities" in english) {
    localized.activities = mergeSharedActivities(
      (english as Record<string, unknown>).activities,
      (khmer as Record<string, unknown>).activities,
    );
  }
  return replaceLegacyCompanyName(localized);
}
