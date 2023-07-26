import React from "react";

function Hamburger(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_b_147_568)">
        <rect width="28" height="28" rx="8" fill="#F8F8F8" />
        <rect
          x="0.5"
          y="0.5"
          width="27"
          height="27"
          rx="7.5"
          stroke="black"
          strokeOpacity="0.2"
        />
      </g>
      <g filter="url(#filter1_d_147_568)">
        <line x1="4" y1="8" x2="24" y2="8" stroke="black" strokeWidth="2" />
        <line x1="4" y1="13" x2="24" y2="13" stroke="black" strokeWidth="2" />
        <line x1="4" y1="18" x2="24" y2="18" stroke="black" strokeWidth="2" />
      </g>
      <defs>
        <filter
          id="filter0_b_147_568"
          x="-4"
          y="-4"
          width="36"
          height="36"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_147_568"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_147_568"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_147_568"
          x="2"
          y="7"
          width="24"
          height="16"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_147_568"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_147_568"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default Hamburger;
