import { app } from "./app.js";
import { bootstrapApp } from "./bootstrap.js";
import { env } from "./config/env.js";

async function bootstrap() {
  await bootstrapApp();

  app.listen(env.PORT, () => {
    console.log(`Admin backend listening on http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to bootstrap backend", error);
  process.exit(1);
});
