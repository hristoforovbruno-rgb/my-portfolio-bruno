"use client";

import { useState } from "react";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { getApiBaseUrl } from "@/lib/api-base-url";
import { getAdminToken } from "@/lib/admin-session";
import { apiRequest } from "@/lib/admin-api";

export default function AdminBackupsPage() {
  const [backupFile, setBackupFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function exportBackup() {
    const response = await fetch(`${getApiBaseUrl()}/api/cms/backups/export`, {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });

    const json = JSON.stringify(await response.json(), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin-backup.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importBackup() {
    if (!backupFile) {
      setStatus("Choose a backup JSON file first.");
      return;
    }

    const shouldImport = window.confirm(
      "Import this backup and replace the current non-auth admin data?",
    );

    if (!shouldImport) {
      return;
    }

    try {
      const fileText = await backupFile.text();
      const parsed = JSON.parse(fileText) as { main?: unknown; cms?: unknown };

      await apiRequest("/api/cms/backups/import", {
        method: "POST",
        body: parsed,
        auth: true,
      });

      setStatus("Backup imported.");
      setBackupFile(null);
    } catch {
      setStatus("Failed to import backup.");
    }
  }

  return (
    <AdminGuard>
      <AdminShell title="Backups" description="Export, import, or reset admin data. Import restores data from a previously exported backup JSON file.">
        <div className="flex flex-wrap gap-4">
          <button type="button" onClick={() => void exportBackup()} className="interactive-button rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black">Export backup</button>
          <label className="theme-ghost interactive-button rounded-full px-5 py-3 text-sm font-semibold">
            <input type="file" accept="application/json" className="hidden" onChange={(event) => setBackupFile(event.target.files?.[0] || null)} />
            {backupFile ? backupFile.name : "Choose backup file"}
          </label>
          <button type="button" onClick={() => void importBackup()} className="interactive-button rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-black">Import backup</button>
          <button
            type="button"
            onClick={async () => {
              const shouldReset = window.confirm(
                "Reset admin data to defaults? This will remove current content, posts, services, media, SEO, and messages.",
              );

              if (!shouldReset) {
                return;
              }

              await apiRequest("/api/cms/backups/reset", { method: "POST", auth: true });
              setStatus("Admin data reset to defaults.");
            }}
            className="interactive-button theme-ghost rounded-full px-5 py-3 text-sm font-semibold hover:text-red-300"
          >
            Reset data to defaults
          </button>
        </div>
        {status ? <p className="theme-text-muted mt-4 text-sm">{status}</p> : null}
      </AdminShell>
    </AdminGuard>
  );
}
