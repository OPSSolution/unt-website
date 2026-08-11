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

test("blank Khmer activity media cannot hide shared images and videos", () => {
  const localized = localizedSection({
    en: {
      activities: [{
        id: "activity-1", title: "Workshop", category: "video", type: "video",
        mediaUrl: "https://ik.imagekit.io/unt/poster.jpg",
        videoUrl: "https://ik.imagekit.io/unt/session.mp4",
        galleryImages: ["https://ik.imagekit.io/unt/photo.jpg"],
      }],
    },
    km: {
      activities: [{
        id: "activity-1", title: "សិក្ខាសាលា", category: "", type: "",
        mediaUrl: "", videoUrl: "", galleryImages: [],
      }],
    },
  }, "km") as { activities: Array<Record<string, unknown>> };

  assert.equal(localized.activities[0].mediaUrl, "https://ik.imagekit.io/unt/poster.jpg");
  assert.equal(localized.activities[0].videoUrl, "https://ik.imagekit.io/unt/session.mp4");
  assert.deepEqual(localized.activities[0].galleryImages, ["https://ik.imagekit.io/unt/photo.jpg"]);
  assert.equal(localized.activities[0].category, "video");
  assert.equal(localized.activities[0].type, "video");
  assert.equal(localized.activities[0].title, "សិក្ខាសាលា");
});

test("new Khmer training activities survive localization and refresh", () => {
  const englishActivity = { id: "activity-1", title: "Workshop", mediaUrl: "https://example.com/one.jpg" };
  const khmerActivity = { id: "activity-2", title: "Khmer workshop", mediaUrl: "https://ik.imagekit.io/example/two.jpg" };
  const data = {
    en: { activities: [englishActivity] },
    km: { activities: [khmerActivity] },
  };
  assert.deepEqual(localizedSection(data, "km"), {
    activities: [englishActivity, khmerActivity],
  });
});

test("upcoming training session structure is shared without leaking English into Khmer", () => {
  const session = { id: "session-1", title: "English title", format: "Hybrid", seatsLeft: 4, totalSeats: 25 };
  const data = { en: { upcoming_sessions: [session] }, km: { upcoming_sessions: [] } };
  assert.deepEqual(localizedSection(data, "km"), {
    upcoming_sessions: [{ id: "session-1", title: "", format: "Hybrid", seatsLeft: 4, totalSeats: 25 }],
  });
});

test("Khmer trade hubs stay matched to countries when translations are reordered", () => {
  const localized = localizedSection({
    en: {
      hubs: [
        { id: "korea", name: "South Korea", flagUrl: "/korea.svg", lat: 37.56, lon: 126.97 },
        { id: "japan", name: "Japan", flagUrl: "/japan.svg", lat: 35.67, lon: 139.65 },
      ],
    },
    km: {
      hubs: [
        { id: "japan", name: "Japan in Khmer" },
        { id: "korea", name: "Korea in Khmer" },
      ],
    },
  }, "km") as { hubs: Array<Record<string, unknown>> };

  assert.equal(localized.hubs[0].id, "korea");
  assert.equal(localized.hubs[0].name, "Korea in Khmer");
  assert.equal(localized.hubs[0].flagUrl, "/korea.svg");
  assert.equal(localized.hubs[1].id, "japan");
  assert.equal(localized.hubs[1].name, "Japan in Khmer");
  assert.equal(localized.hubs[1].flagUrl, "/japan.svg");
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
