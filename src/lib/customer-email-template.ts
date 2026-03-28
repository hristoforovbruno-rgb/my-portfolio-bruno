type CustomerEmailTemplateOptions = {
  eyebrow: string;
  title: string;
  intro: string;
  body: string;
  summaryLabel?: string;
  summaryValue?: string;
  ctaLabel?: string;
  ctaHref?: string;
  signature: string;
  footerText: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMultilineHtml(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

export function renderCustomerEmailTemplate({
  eyebrow,
  title,
  intro,
  body,
  summaryLabel,
  summaryValue,
  ctaLabel,
  ctaHref,
  signature,
  footerText,
}: CustomerEmailTemplateOptions) {
  const ctaBlock = ctaLabel && ctaHref
    ? `
      <div style="margin-top: 28px;">
        <a
          href="${escapeHtml(ctaHref)}"
          style="display: inline-block; border-radius: 999px; background: #d4af37; padding: 14px 22px; color: #090909; font-size: 14px; font-weight: 700; text-decoration: none;"
        >
          ${escapeHtml(ctaLabel)}
        </a>
      </div>
    `
    : "";

  const summaryBlock = summaryLabel && summaryValue
    ? `
      <div style="margin-top: 24px; border: 1px solid rgba(212, 175, 55, 0.18); border-radius: 20px; background: rgba(255, 255, 255, 0.03); padding: 18px 20px;">
        <p style="margin: 0 0 10px; color: #f0d985; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;">
          ${escapeHtml(summaryLabel)}
        </p>
        <div style="font-family: 'Courier New', monospace; color: #f5f1e6; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">
          ${formatMultilineHtml(summaryValue)}
        </div>
      </div>
    `
    : "";

  return `
    <div style="margin: 0; background: #090909; padding: 28px 16px; color: #f5f1e6;">
      <div style="max-width: 680px; margin: 0 auto; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 28px; overflow: hidden; background: linear-gradient(180deg, #171717, #0d0d0d); box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);">
        <div style="padding: 28px 28px 22px; background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.18), transparent 34%), linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(255, 255, 255, 0.02)); border-bottom: 1px solid rgba(212, 175, 55, 0.14);">
          <p style="margin: 0 0 12px; color: #f0d985; font-size: 12px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase;">
            ${escapeHtml(eyebrow)}
          </p>
          <h1 style="margin: 0; color: #ffffff; font-family: Georgia, Cambria, 'Times New Roman', serif; font-size: 30px; line-height: 1.15;">
            ${escapeHtml(title)}
          </h1>
        </div>

        <div style="padding: 28px;">
          <p style="margin: 0 0 16px; color: rgba(245, 241, 230, 0.82); font-size: 16px; line-height: 1.85;">
            ${formatMultilineHtml(intro)}
          </p>

          <div style="color: #f5f1e6; font-size: 15px; line-height: 1.9;">
            ${formatMultilineHtml(body)}
          </div>

          ${summaryBlock}
          ${ctaBlock}

          <p style="margin: 28px 0 0; color: rgba(245, 241, 230, 0.78); font-size: 15px; line-height: 1.8;">
            ${formatMultilineHtml(signature)}
          </p>
        </div>

        <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding: 18px 28px; color: rgba(245, 241, 230, 0.52); font-size: 12px; line-height: 1.7;">
          ${escapeHtml(footerText)}
        </div>
      </div>
    </div>
  `;
}
