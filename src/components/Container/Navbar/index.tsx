"use client";

import React, { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ICategoryData } from "@/types";
import { Transition } from "@headlessui/react";

import Link from "next/link";
import Image from "next/image";
import ChevronDown from "@/assets/icon/ChevronDown";
import Menu from "@/components/Menu";
import Hamburger from "@/assets/icon/Hamburger";
import ContentContainer from "../../ContentContainer";
import config from "@/lib/config";

interface INavbarProps {
  categories: ICategoryData[];
}

const MOBILE_NAV_ID = "mobile-navigation";
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

  const url = path
    ? `/api/revalidate?path=${encodeURIComponent(path)}`
    : "/api/revalidate";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    ...(path ? { body: JSON.stringify({ path }) } : {}),
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

  return { ok: true, message: path ? `Cleared ${path}` : "Cleared whole site" };
}

const AdminCacheControls = () => {
  const pathname = usePathname();
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

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
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={busy}
        onClick={() => run("page")}
        className="rounded-md border border-line bg-mist px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-ink hover:bg-white disabled:opacity-50"
      >
        Clear page
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() => run("site")}
        className="rounded-md border border-line bg-mist px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-ink hover:bg-white disabled:opacity-50"
      >
        Clear site
      </button>
      {status && (
        <span className="hidden max-w-[140px] truncate font-mono text-[10px] text-mute sm:inline">
          {status}
        </span>
      )}
    </div>
  );
};

const Navbar = ({ categories }: INavbarProps) => {
  const [isMenu, setIsMenu] = useState(false);
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("mode") === "admin";

  const toggleMenu = () => setIsMenu(!isMenu);

  return (
    <div className="navbar-root">
      <ContentContainer className="content-wrapper">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label={config.SITE_NAME}
        >
          <Image
            src="/logo.webp"
            alt={config.SITE_NAME}
            width={200}
            height={39}
            className="h-8 w-auto md:h-9"
            priority
          />
        </Link>
        <ul className="nav-list">
          {config.NAV_LINKS.slice(0, 4).map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          {categories && (
            <li>
              <Menu
                buttonLabel="Categories"
                list={categories.map((category) => ({
                  label: category.fields.label,
                  href: `/blogs/${category.fields.slug}`,
                }))}
                button={({ open }) => (
                  <>
                    Categories
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </>
                )}
              />
            </li>
          )}
          {config.NAV_LINKS.slice(4).map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          {isAdmin && (
            <li className="ml-2 flex items-center">
              <AdminCacheControls />
            </li>
          )}
        </ul>
        <div className="mobile-nav-container flex items-center gap-3">
          {isAdmin && <AdminCacheControls />}
          <button
            type="button"
            className="cursor-pointer text-ink"
            aria-label={isMenu ? "Close menu" : "Open menu"}
            aria-expanded={isMenu}
            aria-controls={MOBILE_NAV_ID}
            onClick={toggleMenu}
          >
            <Hamburger aria-hidden="true" />
          </button>
          <Transition
            show={isMenu}
            className="fixed left-0 top-[56px] bg-white w-full transition-all duration-500 ease-in-out"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
          >
            <div id={MOBILE_NAV_ID} className="mobile-nav-menu">
              <ul className="nav-list">
                {config.NAV_LINKS.map((item) => (
                  <li key={item.href} onClick={toggleMenu} className="m-0">
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                <li className="m-0 border-y border-line px-6 py-4 font-mono text-xs uppercase tracking-[0.12em] text-mute">
                  Categories
                </li>
                {categories?.map((category) => (
                  <li
                    onClick={toggleMenu}
                    key={category.fields.slug}
                    className="m-0"
                  >
                    <Link href={`/blogs/${category.fields.slug}`}>
                      {category.fields.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Transition>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Navbar;
