"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { getApiBaseUrl } from "@/lib/api-base-url";
import { useLanguage } from "@/lib/language";
import { usePublicCms } from "@/lib/public-cms";
import { uiCopy } from "@/lib/ui-copy";

const initialState = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

const CONTACT_API_URL = `${getApiBaseUrl()}/api/contact`;

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { locale } = useLanguage();
  const cms = usePublicCms();
  const copy = uiCopy[locale].contactForm;
  const formSettings = cms?.formSettings;

  return (
    <form
      className="theme-surface surface-card grid gap-5 rounded-[2rem] p-5 sm:p-7"
      onSubmit={async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setStatus("idle");
        setErrorMessage(null);

        try {
          const response = await fetch(CONTACT_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              phone: form.phone,
              message: form.message,
              locale,
            }),
          });

          if (!response.ok) {
            const data = response.headers.get("content-type")?.includes("application/json")
              ? ((await response.json().catch(() => null)) as { error?: string } | null)
              : null;

            throw new Error(data?.error || "Request failed");
          }

          setStatus("success");
          setForm(initialState);
          setErrorMessage(formSettings?.successMessage?.[locale] || null);
        } catch (error) {
          setStatus("error");
          setErrorMessage(error instanceof Error ? error.message : copy.errorMessage);
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="theme-text-muted grid gap-2 text-sm">
          {copy.nameLabel}
          <input
            required
            value={form.name}
            autoComplete="name"
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="theme-field field-shell rounded-2xl px-4 py-3 outline-none transition duration-300 focus:border-[var(--color-gold)] focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
            placeholder={copy.namePlaceholder}
          />
        </label>
        <label className="theme-text-muted grid gap-2 text-sm">
          {copy.phoneLabel}
          <input
            value={form.phone}
            autoComplete="tel"
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            className="theme-field field-shell rounded-2xl px-4 py-3 outline-none transition duration-300 focus:border-[var(--color-gold)] focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
            placeholder={copy.phonePlaceholder}
          />
        </label>
      </div>
      <label className="theme-text-muted grid gap-2 text-sm">
        {copy.emailLabel}
        <input
          required
          type="email"
          value={form.email}
          autoComplete="email"
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          className="theme-field field-shell rounded-2xl px-4 py-3 outline-none transition duration-300 focus:border-[var(--color-gold)] focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
          placeholder={copy.emailPlaceholder}
        />
      </label>
      <label className="theme-text-muted grid gap-2 text-sm">
        {copy.messageLabel}
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          className="theme-field field-shell rounded-[1.5rem] px-4 py-3 outline-none transition duration-300 focus:border-[var(--color-gold)] focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
          placeholder={copy.messagePlaceholder}
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting || formSettings?.enabled === false}
        className="interactive-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-black disabled:cursor-wait disabled:opacity-80"
      >
        {formSettings?.enabled === false ? "Form disabled" : isSubmitting ? copy.submitting : copy.submit}
        <ArrowRightIcon className="h-4 w-4" />
      </button>
      <p className="theme-text-faint text-sm leading-7">
        {copy.helperText}
      </p>
      {status === "success" ? (
        <p className="rounded-[1.2rem] border border-[var(--color-gold-soft)] bg-[rgba(212,175,55,0.08)] px-4 py-3 text-sm leading-7 text-[var(--color-gold-light)]">
          {errorMessage || formSettings?.successMessage?.[locale] || copy.successMessage}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-[1.2rem] border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm leading-7 text-red-200">
          {errorMessage || copy.errorMessage}
        </p>
      ) : null}
    </form>
  );
}
