"use client";

import { useEffect, useRef } from "react";
import type { TocHeading } from "@/lib/toc";

type Props = {
  headings: TocHeading[];
  variant: "sidebar" | "disclosure";
};

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pickHeading(event: React.MouseEvent<HTMLAnchorElement>, close?: () => void) {
  const href = event.currentTarget.getAttribute("href");
  const id = href?.startsWith("#") ? href.slice(1) : "";
  const heading = id ? document.getElementById(id) : null;
  if (!heading) return;
  event.preventDefault();
  close?.();
  if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
  heading.scrollIntoView({
    behavior: reducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  heading.focus({ preventScroll: true });
  if (history.pushState) history.pushState(null, "", `#${id}`);
}

function TocList({
  headings,
  onPick,
}: {
  headings: TocHeading[];
  onPick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <ol className="mt-3 m-0 list-none p-0">
      {headings.map((heading) => (
        <li key={heading.id} className="m-0 list-none">
          <a href={`#${heading.id}`} onClick={onPick}>
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

function useActiveSection(ids: string[]) {
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("#toc-d a, #mtoc a"),
    );
    const onScroll = () => {
      const line = Math.min(window.innerHeight * 0.35, 300);
      let current: string | null = null;
      for (const id of ids) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top - line <= 0) {
          current = id;
        }
      }
      links.forEach((link) => {
        const match = current && link.getAttribute("href") === `#${current}`;
        if (match) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
}

export default function ArticleToc({ headings, variant }: Props) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const ids = headings.map((heading) => heading.id);
  useActiveSection(ids);

  if (variant === "sidebar") {
    return (
      <nav id="toc-d" aria-label="Contents" className="article-toc">
        <p
          id="toc-h"
          aria-hidden="true"
          className="text-[12px] font-bold uppercase tracking-[0.08em] text-mute"
        >
          Contents
        </p>
        <TocList headings={headings} onPick={(event) => pickHeading(event)} />
      </nav>
    );
  }

  return (
    <details
      ref={detailsRef}
      id="mtoc"
      className="group mt-8 rounded-xl border border-[#e2e8f0] bg-white min-[1024px]:hidden"
    >
      <summary className="flex min-h-[var(--control-h)] cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 text-[16px] font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
        <span>
          Contents{" "}
          <span className="font-normal text-mute">
            · {headings.length} {headings.length === 1 ? "section" : "sections"}
          </span>
        </span>
        <svg
          aria-hidden="true"
          className="h-4 w-4 transition group-open:rotate-180"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.58l3.3-3.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z"
            clipRule="evenodd"
          />
        </svg>
      </summary>
      <nav aria-label="Contents" className="article-toc border-t border-[#e2e8f0] px-2 py-2">
        <TocList
          headings={headings}
          onPick={(event) =>
            pickHeading(event, () => {
              if (detailsRef.current) detailsRef.current.open = false;
            })
          }
        />
      </nav>
    </details>
  );
}
