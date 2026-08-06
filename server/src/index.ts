import { createApp } from "./app.js";
import { env } from "./config/env.js";

createApp().listen(env.PORT, () => {
  console.log(`Server running on http://${env.HOST}:${env.PORT}`);
});
