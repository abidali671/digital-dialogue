"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

/** Cover photo with a text fallback when the file fails to load. */
export default function CoverImage({
  src,
  alt,
  width,
  height,
  className,
  loading,
  fetchPriority,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="grid h-full w-full place-items-center bg-mist-soft px-3 text-center text-[14px] font-semibold text-mute">
        Image unavailable
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
