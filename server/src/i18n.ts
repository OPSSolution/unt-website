import type { Request } from "express";
import type { RequestHandler } from "express";

export type ContentLanguage = "en" | "km";
export type Translations = Record<string, Record<string, unknown>>;

const SHARED_FIELD = /(^id$|_id$|^origin$|image|avatar|url|flag|created_at|updated_at|sort_order|featured|available)/i;
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
  const localizedItems = khmer.filter((item): item is Record<string, unknown> =>
    !!item && typeof item === "object" && !Array.isArray(item));
  const khmerById = new Map(localizedItems.map((item) => [item.id, item]));
  const englishIds = new Set(english
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object" && !Array.isArray(item))
    .map((item) => item.id));
  const merged = english.map((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return item;
    const base = item as Record<string, unknown>;
    const positional = khmer[index];
    const translated = khmerById.get(base.id) ?? (
      positional && typeof positional === "object" && !Array.isArray(positional) && !("id" in positional)
        ? positional
        : undefined
    );
    return translated && typeof translated === "object" && !Array.isArray(translated)
      ? { ...base, ...translated }
      : base;
  });
  // Activities created while editing Khmer have no English counterpart yet.
  // Keep them instead of silently dropping them on the next read/refresh.
  return [
    ...merged,
    ...localizedItems.filter((item) => !englishIds.has(item.id)),
  ];
}

function mergeLocalizedSessions(english: unknown, khmer: unknown) {
  if (!Array.isArray(english)) return Array.isArray(khmer) ? khmer : [];
  const localizedItems = Array.isArray(khmer) ? khmer : [];
  const localizedById = new Map(localizedItems
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object" && !Array.isArray(item))
    .map((item) => [item.id, item]));
  return english.map((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return item;
    const base = item as Record<string, unknown>;
    const blank = blankLocalizedFields(base);
    // These fields control identity/filtering and are not translated copy.
    blank.format = base.format;
    if (base.promoCode !== undefined) blank.promoCode = base.promoCode;
    const translated = localizedById.get(base.id) ?? localizedItems[index];
    return translated && typeof translated === "object" && !Array.isArray(translated)
      ? { ...blank, ...translated }
      : blank;
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
  if (language !== "km") return base as T;

  const merged = { ...blankLocalizedFields(base), ...(localized ?? {}) } as Record<string, unknown>;
  // Structural fields describe the same record in every language. Restore
  // their canonical values after applying older translations so a stale blank
  // translation cannot erase an image, flag, country origin, or identifier.
  Object.entries(base).forEach(([key, value]) => {
    if (SHARED_FIELD.test(key)) merged[key] = value;
  });
  return merged as T;
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
  if ("upcoming_sessions" in english) {
    localized.upcoming_sessions = mergeLocalizedSessions(
      (english as Record<string, unknown>).upcoming_sessions,
      (khmer as Record<string, unknown>).upcoming_sessions,
    );
  }
  return replaceLegacyCompanyName(localized);
}
