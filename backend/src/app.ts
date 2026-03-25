import cors from "cors";
import express from "express";
import helmetImport from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { bootstrapApp } from "./bootstrap.js";
import { authRoutes } from "./routes/auth.routes.js";
import { contactRoutes } from "./routes/contact.routes.js";
import { cmsRoutes } from "./routes/cms.routes.js";
import { dashboardRoutes } from "./routes/dashboard.routes.js";
import { settingsRoutes } from "./routes/settings.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

const helmet = (helmetImport as unknown as { default?: typeof helmetImport } | typeof helmetImport);
const helmetMiddleware = typeof helmet === "function" ? helmet : helmet.default;

if (!helmetMiddleware) {
  throw new Error("Helmet middleware is unavailable.");
}

export const app = express();

app.use(helmetMiddleware());
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
