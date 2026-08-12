import { LinkIcon } from "@/assets/icon";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import { useState } from "react";

const ShareButtons = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = url;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <div className="flex gap-3 items-center">
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
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
