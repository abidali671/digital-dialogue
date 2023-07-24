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

      <div
        onClick={handleCopy}
        className="flex h-8 w-8 rounded-full justify-center items-center bg-gray-200 relative cursor-pointer"
      >
        <LinkIcon />
        {copied && (
          <div className="absolute top-full w-28 p-1 bg-white shadow-xl border border-gray-200 text-center text-sm text-green-500 font-medium rounded mt-2">
            Text copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareButtons;
