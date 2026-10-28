"use client";

import { useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "selected" | "failed";

const RESET_MS = 2000;

/** Older browsers and denied clipboard permissions. Returns false instead of throwing. */
function copyWithExecCommand(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("aria-hidden", "true");
  textarea.tabIndex = -1;
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.padding = "0";
  textarea.style.border = "none";
  textarea.style.outline = "none";
  textarea.style.boxShadow = "none";
  textarea.style.background = "transparent";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);

  const previouslyFocused =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }

  document.body.removeChild(textarea);
  previouslyFocused?.focus();
  return ok;
}

async function copyText(text: string): Promise<boolean> {
  const writeText = navigator.clipboard?.writeText?.bind(navigator.clipboard);
  if (writeText) {
    try {
      await writeText(text);
      return true;
    } catch {
      // Permission denied, or no secure context. Try the fallback below.
    }
  }
  return copyWithExecCommand(text);
}

function selectCode(button: HTMLElement): boolean {
  const code = button.closest(".code-block")?.querySelector("code");
  if (!code) return false;
  const selection = window.getSelection();
  if (!selection) return false;
  const range = document.createRange();
  range.selectNodeContents(code);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
}

const VISIBLE_LABEL: Record<CopyState, string> = {
  idle: "Copy",
  copied: "Copied",
  selected: "Selected",
  failed: "Copy failed",
};

const ACCESSIBLE_LABEL: Record<CopyState, string> = {
  idle: "Copy code",
  copied: "Copied",
  selected: "Code selected. Copy it with your keyboard.",
  failed: "Copy isn't available in this browser.",
};

type CopyCodeButtonProps = {
  text: string;
};

const CopyCodeButton = ({ text }: CopyCodeButtonProps) => {
  const [state, setState] = useState<CopyState>("idle");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const flash = (next: CopyState) => {
    setState(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setState("idle");
      timer.current = null;
    }, RESET_MS);
  };

  const handleCopy = async () => {
    try {
      if (await copyText(text)) {
        flash("copied");
        return;
      }
    } catch {
      // copyText already handles clipboard failures. This is a last guard.
    }

    const button = buttonRef.current;
    if (button && selectCode(button)) {
      flash("selected");
      return;
    }
    flash("failed");
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className="code-block-copy"
      data-state={state}
      aria-live="polite"
      aria-atomic="true"
      aria-label={ACCESSIBLE_LABEL[state]}
      onClick={handleCopy}
    >
      {VISIBLE_LABEL[state]}
    </button>
  );
};

export default CopyCodeButton;
