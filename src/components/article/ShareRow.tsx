"use client";

import { useRef, useState } from "react";

type Props = {
  url: string;
  title: string;
  announce?: boolean;
};

const CIRCLE =
  "inline-flex h-[var(--control-h)] w-[var(--control-h)] items-center justify-center rounded-full border border-[#cbd5e1] bg-white text-ink hover:border-[#0f766e] hover:bg-[#f0fdfa]";

function LinkIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="text-[#0f766e]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.24-1.48A9.9 9.9 0 1 0 12.04 2zm5.76 14.16c-.24.68-1.4 1.28-1.96 1.36-.5.08-1.12.12-1.8-.12-.42-.14-.96-.32-1.66-.62-2.92-1.26-4.82-4.2-4.96-4.4-.14-.2-1.16-1.54-1.16-2.94s.74-2.08 1-2.36c.24-.28.54-.36.72-.36h.52c.16 0 .4-.06.62.48.24.56.8 1.94.86 2.08.08.14.12.3.02.48-.1.2-.14.32-.28.5-.14.16-.3.36-.42.48-.14.14-.28.28-.12.54.16.28.7 1.16 1.5 1.88 1.04.92 1.9 1.2 2.18 1.34.28.14.44.12.6-.06.16-.2.7-.82.88-1.1.18-.28.36-.24.6-.14.24.1 1.54.72 1.8.86.26.12.44.2.5.32.08.12.08.68-.16 1.36z" />
    </svg>
  );
}

function FbIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4V10c0-.6.4-1 1-1z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L22.7 22h-6.6l-4.4-6.4L6.2 22H3.1l7.3-8.3L1.5 2h6.7l4 5.9L18.9 2zm-1.2 18h1.8L6.4 3.9H4.5L17.7 20z" />
    </svg>
  );
}

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    document.body.removeChild(field);
  }
}

function announceCopied() {
  const status = document.getElementById("share-status");
  if (!status) return;
  status.textContent = "";
  window.setTimeout(() => {
    status.textContent = "Link copied";
  }, 50);
}

export default function ShareRow({ url, title, announce = false }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const networks = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <WaIcon />,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FbIcon />,
    },
    {
      name: "X",
      href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XIcon />,
    },
  ];

  const onCopy = async () => {
    await writeClipboard(url);
    setCopied(true);
    announceCopied();
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {announce ? (
        <p id="share-status" className="sr-only" role="status" aria-live="polite" />
      ) : null}
      <ul className="m-0 flex list-none flex-nowrap items-center gap-2 p-0">
        <li className="share-tip m-0 list-none">
          <button
            type="button"
            aria-label="Copy link"
            onClick={onCopy}
            className={`${CIRCLE} share-copy ${copied ? "is-copied !border-[#0f766e] !bg-[#f0fdfa]" : ""}`}
          >
            {copied ? <CheckIcon /> : <LinkIcon />}
          </button>
          <span className="share-tt" aria-hidden="true">
            {copied ? "Link copied" : "Copy link"}
          </span>
        </li>
        {networks.map((network) => (
          <li key={network.name} className="share-tip m-0 list-none">
            <a
              href={network.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${network.name} (opens in a new tab)`}
              className={CIRCLE}
            >
              {network.icon}
            </a>
            <span className="share-tt" aria-hidden="true">
              {network.name}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
