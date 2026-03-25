import { ensureAdminUser } from "./services/admin-bootstrap.js";
import { connectDatabase } from "./config/db.js";
import { initializeCmsStore } from "./store/cms-store.js";
import { initializeStore } from "./store/data-store.js";

let bootstrapPromise: Promise<void> | null = null;

export function bootstrapApp() {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      await connectDatabase();
      await initializeStore();
      await initializeCmsStore();
      await ensureAdminUser();
    })().catch((error) => {
      console.error("Bootstrap failed", error);
      bootstrapPromise = null;
      throw error;
    });
  }

  return bootstrapPromise;
}
