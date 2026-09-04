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
  hashtags?: string[];
}

/** Title on top, hashtags next; link is appended separately by each network. */
function buildShareText(title?: string, hashtags?: string[]) {
  const tags = (hashtags ?? []).map((tag) => `#${tag}`).join(" ");
  return [title?.trim(), tags].filter(Boolean).join("\n\n");
}

const ShareButtons = ({ url, title, hashtags = [] }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const shareText = buildShareText(title, hashtags);

  const handleCopy = async () => {
    const clipboardText = [shareText, url].filter(Boolean).join("\n\n");
    try {
      await navigator.clipboard.writeText(clipboardText);
    } catch {
      const tempTextarea = document.createElement("textarea");
      tempTextarea.value = clipboardText;
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="flex items-center gap-3">
      <FacebookShareButton url={url} quote={shareText || title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
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
            Link copied!
          </div>
        )}
      </button>
    </div>
  );
};

export default ShareButtons;
