import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const rateLimit = require("express-rate-limit") as typeof import("express-rate-limit").default;

export const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many contact submissions. Please try again later." },
});
