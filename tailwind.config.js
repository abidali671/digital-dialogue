/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1100px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0F172A",
          soft: "#1E293B",
        },
        mist: {
          DEFAULT: "#F4F6F8",
          soft: "#EEF2F6",
        },
        accent: {
          DEFAULT: "#0D9488",
          hover: "#0F766E",
          soft: "#CCFBF1",
        },
        mute: {
          DEFAULT: "#64748B",
          soft: "#94A3B8",
        },
        line: {
          DEFAULT: "#E2E8F0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        Montserrat: ["var(--font-body)", "system-ui", "sans-serif"],
        PT: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        /* 44px desktop H1 lives only in --fs-h1. Do not add a text-[44px] utility. */
        h1: ["var(--fs-h1)", { lineHeight: "var(--lh-h1)", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["var(--fs-h2)", { lineHeight: "var(--lh-h2)", letterSpacing: "-0.01em", fontWeight: "700" }],
        h3: ["var(--fs-h3)", { lineHeight: "var(--lh-h3)", fontWeight: "700" }],
        h4: ["var(--fs-h4)", { lineHeight: "var(--lh-h4)", fontWeight: "600" }],
        faq: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        figure: ["var(--fs-figure)", { lineHeight: "1.1", fontWeight: "600" }],
        "figure-sm": ["1.5rem", { lineHeight: "1.25", fontWeight: "600" }],
        lead: ["var(--fs-lead)", { lineHeight: "var(--lh-lead)" }],
        prose: ["var(--fs-prose)", { lineHeight: "var(--lh-prose)" }],
        copy: ["1rem", { lineHeight: "1.6" }],
        ui: ["0.875rem", { lineHeight: "1.45" }],
        caption: ["0.75rem", { lineHeight: "1.35" }],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
