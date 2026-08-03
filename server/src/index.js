"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const supabase_1 = require("./supabase");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Server is running");
});
app.get("/api/health", async (_req, res) => {
    try {
        const { data, error } = await supabase_1.supabase.from("profiles").select("count", { count: "exact", head: true });
        if (error) {
            return res.status(500).json({ ok: false, error: error.message });
        }
        return res.json({ ok: true, data });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Supabase error";
        return res.status(500).json({ ok: false, error: message });
    }
});
const PORT = Number(process.env.PORT ?? 5000);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map