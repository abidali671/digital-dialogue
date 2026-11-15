import type { ReactNode } from "react";

export default function Callout({
  tone = "note",
  children,
}: {
  tone?: "note" | "warn";
  children: ReactNode;
}) {
  if (!children) return null;
  return (
    <div className={tone === "warn" ? "callout warn" : "callout"} role="note">
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.75-4.5h1.5v1.5h-1.5V13.5zM10.75 6h-1.5v6h1.5V6z"
          clipRule="evenodd"
        />
      </svg>
      <div>{children}</div>
    </div>
  );
}
