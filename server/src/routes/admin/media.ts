import { createHmac, randomUUID } from "node:crypto";
import express, { Router } from "express";
import { env } from "../../config/env.js";
import { removeBgApiKey } from "./settings.js";

const router = Router();

router.post("/signature", (req, res) => {
  if (!env.IMAGEKIT_PUBLIC_KEY || !env.IMAGEKIT_PRIVATE_KEY) {
    return res.status(503).json({ error: "ImageKit is not configured on the server." });
  }

  const token = randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 20 * 60;
  const requestedFolder = typeof req.body?.folder === "string" ? req.body.folder : "media";
  const safeFolder = requestedFolder.replace(/[^a-zA-Z0-9/_-]/g, "").replace(/^\/+|\/+$/g, "");
  const folder = `/unt-website/${safeFolder || "media"}`;
  const signature = createHmac("sha1", env.IMAGEKIT_PRIVATE_KEY).update(token + expire).digest("hex");

  return res.json({ token, expire, signature, folder, publicKey: env.IMAGEKIT_PUBLIC_KEY });
});

router.post("/remove-background", express.raw({ type: ["image/png", "image/jpeg", "image/webp"], limit: "10mb" }), async (req, res) => {
  const apiKey = await removeBgApiKey();
  if (!apiKey) {
    return res.status(503).json({ error: "Remove background API is not configured on the server." });
  }
  if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
    return res.status(400).json({ error: "Upload an image to remove its background." });
  }

  const formData = new FormData();
  const contentType = req.headers["content-type"] || "image/png";
  formData.append("image_file", new Blob([new Uint8Array(req.body)], { type: contentType }), "product-image");
  formData.append("size", "auto");

  const removeResponse = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": apiKey },
    body: formData,
  });

  if (!removeResponse.ok) {
    const details = await removeResponse.text().catch(() => "");
    return res.status(removeResponse.status).json({ error: details || "Background removal failed." });
  }

  const imageBuffer = Buffer.from(await removeResponse.arrayBuffer());
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "no-store");
  return res.send(imageBuffer);
});

export default router;
