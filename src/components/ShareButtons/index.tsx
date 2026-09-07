"use client";

import LinkIcon from "@/assets/icon/link";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title?: string;
  excerpt?: string;
  hashtags?: string[];
}

/** Title + hashtags for X / WhatsApp. */
function buildShareText(title?: string, hashtags?: string[]) {
  const heading = title?.trim() ?? "";
  const tags = (hashtags ?? [])
    .map((tag) => `#${tag.replace(/^#/, "")}`)
    .join(" ");
  return [heading, tags].filter(Boolean).join("\n\n");
}

/** Facebook clipboard caption: title, excerpt, hashtags, link. */
function buildFacebookCaption(
  url: string,
  title?: string,
  excerpt?: string,
  hashtags?: string[]
) {
  const tags = (hashtags ?? [])
    .map((tag) => `#${tag.replace(/^#/, "")}`)
    .join(" ");
  return [title?.trim(), excerpt?.trim(), tags, url]
    .filter(Boolean)
    .join("\n\n");
}

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = text;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
  }
}

const ShareButtons = ({
  url,
  title,
  excerpt,
  hashtags = [],
}: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const [facebookHint, setFacebookHint] = useState(false);
  const shareText = buildShareText(title, hashtags);
  const facebookCaption = buildFacebookCaption(url, title, excerpt, hashtags);

  const handleCopy = async () => {
    await writeClipboard(facebookCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <FacebookShareButton
          url={url}
          beforeOnClick={async () => {
            await writeClipboard(facebookCaption);
            setFacebookHint(true);
            setTimeout(() => setFacebookHint(false), 3000);
          }}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        {facebookHint && (
          <div className="absolute left-1/2 top-full z-10 mt-2 w-40 -translate-x-1/2 rounded border border-line bg-white p-2 text-center text-xs font-medium text-ink shadow-sm">
            Caption copied — paste into Facebook
          </div>
        )}
      </div>
      <TwitterShareButton url={url} title={shareText || title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton
        url={url}
        title={shareText || title}
        separator={"\n\n"}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy share text"
        className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-mist text-ink transition-colors hover:bg-accent-soft"
      >
        <LinkIcon />
        {copied && (
          <div className="absolute top-full z-10 mt-2 w-28 rounded border border-line bg-white p-1 text-center text-xs font-medium text-accent">
            Copied!
          </div>
        )}
      </button>
    </div>
  );
};

export default ShareButtons;
