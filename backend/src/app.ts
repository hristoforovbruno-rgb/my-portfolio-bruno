import cors from "cors";
import express from "express";
import mongoose from "mongoose";
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

function sendHealth(_request: express.Request, response: express.Response) {
  response.json({
    ok: true,
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : mongoose.connection.readyState === 2
          ? "connecting"
          : "disconnected",
  });
}

app.get("/health", sendHealth);
app.get("/api/health", sendHealth);

app.use(async (_request, _response, next) => {
  try {
    await bootstrapApp();
    next();
  } catch (error) {
    next(error);
  }
});

const apiRouter = express.Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/contact", contactRoutes);
apiRouter.use("/cms", cmsRoutes);
apiRouter.use("/dashboard", dashboardRoutes);
apiRouter.use("/settings", settingsRoutes);

// Support both local Node hosting (`/api/*`) and Vercel serverless mounting (`/*` inside api/[...path]).
app.use(apiRouter);
app.use("/api", apiRouter);

app.use(errorHandler);
