import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createRequire } from "node:module";
import { env } from "./config/env.js";
import { bootstrapApp } from "./bootstrap.js";
import { authRoutes } from "./routes/auth.routes.js";
import { contactRoutes } from "./routes/contact.routes.js";
import { cmsRoutes } from "./routes/cms.routes.js";
import { dashboardRoutes } from "./routes/dashboard.routes.js";
import { settingsRoutes } from "./routes/settings.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

const require = createRequire(import.meta.url);
const helmet = require("helmet") as () => express.RequestHandler;

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN.split(",").map((value) => value.trim()),
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(async (_request, _response, next) => {
  try {
    await bootstrapApp();
    next();
  } catch (error) {
    next(error);
  }
});

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cms", cmsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/settings", settingsRoutes);

app.use(errorHandler);
