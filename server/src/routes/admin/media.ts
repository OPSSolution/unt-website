import { createHash, createHmac, randomUUID } from "node:crypto";
import express, { Router } from "express";
import { removeBgApiKey, imagekitKeys, cloudinaryKeys } from "./settings.js";

const router = Router();

router.post("/signature", async (req, res) => {
  const { publicKey, privateKey } = await imagekitKeys();
  if (!publicKey || !privateKey) {
    return res.status(503).json({ error: "ImageKit is not configured on the server." });
  }

  const token = randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 20 * 60;
  const requestedFolder = typeof req.body?.folder === "string" ? req.body.folder : "media";
  const safeFolder = requestedFolder.replace(/[^a-zA-Z0-9/_-]/g, "").replace(/^\/+|\/+$/g, "");
  const folder = `/unt-website/${safeFolder || "media"}`;
  const signature = createHmac("sha1", privateKey).update(token + expire).digest("hex");

  return res.json({ token, expire, signature, folder, publicKey });
});

router.post("/remove-background", express.raw({ type: "*/*", limit: "10mb" }), async (req, res) => {
  const apiKey = await removeBgApiKey();
  if (!apiKey) {
    return res.status(503).json({ error: "Remove background API is not configured on the server." });
  }
  if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
    return res.status(400).json({ error: "Upload an image to remove its background." });
  }

  const contentType = (req.headers["x-file-type"] || "image/png") as string;
  const formData = new FormData();
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

router.post("/cloudinary-upload", express.raw({ type: "*/*", limit: "100mb" }), async (req, res) => {
  const { cloudName, apiKey, apiSecret } = await cloudinaryKeys();
  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(503).json({ error: "Cloudinary is not configured on the server." });
  }
  if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
    return res.status(400).json({ error: "No file received." });
  }

  const contentType = (req.headers["x-file-type"] || "image/jpeg") as string;
  const folder = typeof req.query.folder === "string" ? req.query.folder.replace(/[^a-zA-Z0-9/_-]/g, "") : "media";
  const folderPath = `/unt-website/${folder}`;
  const timestamp = Math.floor(Date.now() / 1000);

  // Cloudinary signature: SHA1("folder=...&timestamp=...{apiSecret}")
  const stringToSign = `folder=${folderPath}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(stringToSign).digest("hex");

  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(req.body)], { type: contentType }), "upload");
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("signature", signature);
  form.append("folder", folderPath);

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, { method: "POST", body: form });
  const data = await uploadRes.json().catch(() => ({})) as { secure_url?: string; public_id?: string; error?: { message: string } };
  if (!uploadRes.ok || !data.secure_url) {
    return res.status(uploadRes.status).json({ error: data.error?.message ?? "Cloudinary upload failed." });
  }

  return res.json({ url: data.secure_url, fileId: data.public_id });
});

export default router;
