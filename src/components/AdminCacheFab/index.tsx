"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SECRET_STORAGE_KEY = "dd_revalidate_secret";
const ADMIN_MODE_KEY = "dd_admin_mode";

function readSecret(): string | null {
  if (typeof window === "undefined") return null;

  const fromLocal = localStorage.getItem(SECRET_STORAGE_KEY);
  if (fromLocal) return fromLocal;

  // Migrate older session-only secret if present.
  const fromSession = sessionStorage.getItem(SECRET_STORAGE_KEY);
  if (fromSession) {
    localStorage.setItem(SECRET_STORAGE_KEY, fromSession);
    sessionStorage.removeItem(SECRET_STORAGE_KEY);
    return fromSession;
  }

  return null;
}

function getRevalidateSecret(): string | null {
  const stored = readSecret();
  if (stored) return stored;

  const entered = window.prompt("Enter REVALIDATE_SECRET");
  if (!entered) return null;

  localStorage.setItem(SECRET_STORAGE_KEY, entered);
  return entered;
}

function clearStoredSecret() {
  localStorage.removeItem(SECRET_STORAGE_KEY);
  sessionStorage.removeItem(SECRET_STORAGE_KEY);
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
      clearStoredSecret();
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
  const urlIsAdmin = searchParams.get("mode") === "admin";

  const [isAdmin, setIsAdmin] = useState(urlIsAdmin);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (urlIsAdmin) {
      localStorage.setItem(ADMIN_MODE_KEY, "1");
      setIsAdmin(true);
      return;
    }

    setIsAdmin(localStorage.getItem(ADMIN_MODE_KEY) === "1");
  }, [urlIsAdmin]);

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

  const exitAdmin = () => {
    localStorage.removeItem(ADMIN_MODE_KEY);
    clearStoredSecret();
    setIsAdmin(false);
    setOpen(false);
    setStatus(null);
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
          <button
            type="button"
            disabled={busy}
            onClick={exitAdmin}
            className="rounded-md border border-line px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wide text-mute hover:bg-mist disabled:opacity-50"
          >
            Exit admin
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
