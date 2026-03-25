import { readFile } from "node:fs/promises";
import path from "node:path";

type SeoPage = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
};

type CmsStoreShape = {
  seoPages?: SeoPage[];
};

const STORE_PATH = path.resolve(process.cwd(), "backend", "data", "admin-cms.json");

export async function getSeoOverride(pathname: string) {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const store = JSON.parse(raw) as CmsStoreShape;
    return store.seoPages?.find((item) => item.path === pathname) ?? null;
  } catch {
    return null;
  }
}
