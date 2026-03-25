"use client";

const TOKEN_KEY = "admin_token";
const EMAIL_KEY = "admin_email";

export function getAdminToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(TOKEN_KEY) || "";
}

export function getAdminEmail() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(EMAIL_KEY) || "";
}

export function setAdminSession(token: string, email: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(EMAIL_KEY, email);
  document.cookie = `admin_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

export function clearAdminSession() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(EMAIL_KEY);
  document.cookie = "admin_token=; path=/; max-age=0; samesite=lax";
}
