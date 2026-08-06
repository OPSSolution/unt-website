import assert from "node:assert/strict";
import test from "node:test";
import express from "express";
import request from "supertest";
import { validateBody } from "../src/middleware/validate.js";
import { productSchema } from "../src/schemas/content.js";
import adminRouter from "../src/routes/admin/index.js";
import productsRouter from "../src/routes/products.js";

test("product validation rejects incomplete request bodies", async () => {
  const app = express();
  app.use(express.json());
  app.post("/products", validateBody(productSchema), (_req, res) => res.sendStatus(201));
  const response = await request(app).post("/products").send({ name: "Only a name" });
  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Invalid request body");
});

test("product validation accepts a complete request body", async () => {
  const app = express();
  app.use(express.json());
  app.post("/products", validateBody(productSchema), (_req, res) => res.sendStatus(201));
  const response = await request(app).post("/products").send({
    name: "Tea", category: "Food & Beverage", origin: "Thailand", origin_flag: "TH",
    moq: "100", lead_time: "2 weeks", image: "/tea.jpg", description: "Tea",
    oem_available: true, specifications: [], certifications: [],
  });
  assert.equal(response.status, 201);
});

test("the public product namespace has no write endpoint", async () => {
  const app = express();
  app.use(express.json());
  app.use("/api/products", productsRouter);
  const response = await request(app).post("/api/products").send({});
  assert.equal(response.status, 404);
});

test("the admin namespace rejects mutations without authentication", async () => {
  const app = express();
  app.use(express.json());
  app.use("/api/admin", adminRouter);
  const response = await request(app).post("/api/admin/products").send({});
  assert.equal(response.status, 401);
});
