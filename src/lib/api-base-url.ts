const FALLBACK_API_BASE_URL = "http://localhost:4000";

export function getApiBaseUrl() {
  const rawValue = process.env.NEXT_PUBLIC_ADMIN_API_URL?.trim();

  if (!rawValue) {
    return FALLBACK_API_BASE_URL;
  }

  try {
    const parsedUrl = new URL(rawValue);
    return parsedUrl.origin;
  } catch {
    return FALLBACK_API_BASE_URL;
  }
}
