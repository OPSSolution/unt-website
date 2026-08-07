import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import request from "supertest";
import { localizedSection, localizeRow, protectLanguageIntegrity, requireContentLanguage } from "../src/i18n.js";

test("Khmer row fields never fall back to English text", () => {
  const row = {
    id: "1",
    name: "English name",
    image: "/shared.jpg",
    translations: { km: { name: "ឈ្មោះខ្មែរ" } },
  };
  assert.deepEqual(localizeRow(row, "km"), {
    id: "1", name: "ឈ្មោះខ្មែរ", image: "/shared.jpg",
  });
});

test("localized homepage sections blank untranslated English fields", () => {
  const data = { en: { heading: "Hello", cta: "Read" }, km: { heading: "សួស្តី" } };
  assert.deepEqual(localizedSection(data, "km"), { heading: "សួស្តី", cta: "" });
  assert.deepEqual(localizedSection(data, "en"), data.en);
});

test("legacy company names in saved homepage content use the legal company name", () => {
  const data = {
    en: {
      company_name: "UNT COMPANY",
      description: "Partner with UNT Company",
      legal: "Unique Noble Trading Co., Ltd. (UNT Company)",
    },
    km: {},
  };
  assert.deepEqual(localizedSection(data, "en"), {
    company_name: "Unique Noble Trading Co., Ltd.",
    description: "Partner with Unique Noble Trading Co., Ltd.",
    legal: "Unique Noble Trading Co., Ltd.",
  });
});

test("training activity media remains available when Khmer text is empty", () => {
  const activity = { id: "activity-1", title: "Workshop", mediaUrl: "https://example.com/photo.jpg" };
  const data = { en: { heading: "Training", activities: [activity] }, km: { heading: "", activities: [] } };
  assert.deepEqual(localizedSection(data, "km"), { heading: "", activities: [activity] });
});

test("admin writes require an explicit content language", async () => {
  const app = express();
  app.put("/content", requireContentLanguage, (_req, res) => res.sendStatus(204));
  assert.equal((await request(app).put("/content")).status, 400);
  assert.equal((await request(app).put("/content").set("X-Content-Language", "km")).status, 204);
});

test("Khmer script cannot overwrite the English content slot", async () => {
  const app = express();
  app.use(express.json());
  app.put("/content", requireContentLanguage, protectLanguageIntegrity, (_req, res) => res.sendStatus(204));
  const response = await request(app).put("/content")
    .set("X-Content-Language", "en").send({ heading: "ចំណងជើង" });
  assert.equal(response.status, 400);
});
