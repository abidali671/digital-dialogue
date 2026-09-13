"use client";

import React, { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SECRET_STORAGE_KEY = "dd_revalidate_secret";

function getRevalidateSecret(): string | null {
  if (typeof window === "undefined") return null;

  const stored = sessionStorage.getItem(SECRET_STORAGE_KEY);
  if (stored) return stored;

  const entered = window.prompt("Enter REVALIDATE_SECRET");
  if (!entered) return null;

  sessionStorage.setItem(SECRET_STORAGE_KEY, entered);
  return entered;
}

async function callRevalidate(path?: string) {
  const secret = getRevalidateSecret();
  if (!secret) return { ok: false, message: "Secret required" };

  const res = await fetch("/api/revalidate", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: path ? JSON.stringify({ path }) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) {
      sessionStorage.removeItem(SECRET_STORAGE_KEY);
    }
    return {
      ok: false,
      message: data.error || `Failed (${res.status})`,
    };
  }

  return {
    ok: true,
    message: path ? `Cleared ${path}` : "Cleared whole site",
  };
}

const AdminCacheFab = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("mode") === "admin";

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!isAdmin) return null;

  const run = async (scope: "page" | "site") => {
    setBusy(true);
    setStatus(null);
    const result =
      scope === "page"
        ? await callRevalidate(pathname || "/")
        : await callRevalidate();
    setStatus(result.message);
    setBusy(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
      {open && (
        <div className="flex w-44 flex-col gap-2 rounded-lg border border-line bg-white/95 p-2 shadow-md backdrop-blur-md">
          <button
            type="button"
            disabled={busy}
            onClick={() => run("page")}
            className="rounded-md border border-line bg-mist px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wide text-ink hover:bg-white disabled:opacity-50"
          >
            Clear page
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => run("site")}
            className="rounded-md border border-line bg-mist px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wide text-ink hover:bg-white disabled:opacity-50"
          >
            Clear site
          </button>
          {status && (
            <p className="break-words px-1 font-mono text-[10px] text-mute">
              {status}
            </p>
          )}
        </div>
      )}
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close cache tools" : "Open cache tools"}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink font-mono text-[10px] font-semibold uppercase tracking-wide text-white shadow-md hover:bg-mute"
      >
        {open ? "×" : "Cache"}
      </button>
    </div>
  );
};

export default AdminCacheFab;
