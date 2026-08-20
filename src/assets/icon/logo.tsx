import React from "react";

/** Wordmark: Digital (ink) + Dialogue (teal), with a simple D mark. */
function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="200"
      height="36"
      viewBox="0 0 200 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect x="0" y="4" width="28" height="28" rx="6" fill="#0D9488" />
      <path
        d="M9.2 11.5h6.4c3.5 0 5.7 1.9 5.7 4.9 0 3.1-2.2 5.1-5.7 5.1H12v3.9H9.2V11.5zm2.8 2.3v5.4h3.4c1.9 0 3-0.9 3-2.7 0-1.7-1.1-2.7-3-2.7H12z"
        fill="#FFFFFF"
      />
      <text
        x="38"
        y="24"
        fill="#0F172A"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="18"
        fontWeight="700"
        letterSpacing="-0.3"
      >
        Digital
      </text>
      <text
        x="102"
        y="24"
        fill="#0D9488"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="18"
        fontWeight="700"
        letterSpacing="-0.3"
      >
        Dialogue
      </text>
    </svg>
  );
}

export default Logo;
