import "dotenv/config";
import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import articlesRouter from "./routes/articles.js";
import partnersRouter from "./routes/partners.js";
import homepageRouter from "./routes/homepage.js";
import heroRouter from "./routes/hero.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "UNT Server running" });
});

// Public + Admin content routes
app.use("/api/products", productsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/partners", partnersRouter);
app.use("/api/hero", heroRouter);
app.use("/api/homepage", homepageRouter);

const PORT = Number(process.env.PORT ?? 5000);
const HOST = process.env.HOST ?? "localhost";
app.listen(PORT, () => console.log(`Server running on http://${HOST}:${PORT}`));
