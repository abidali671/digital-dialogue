import { Fraunces, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";

export const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  display: "optional",
  preload: true,
  adjustFontFallback: true,
  weight: ["400", "600", "700"],
  variable: "--font-body",
});

export const displayFont = Fraunces({
  subsets: ["latin"],
  display: "optional",
  preload: true,
  adjustFontFallback: true,
  axes: ["opsz"],
  variable: "--font-display",
});

export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "optional",
  preload: true,
  adjustFontFallback: true,
  weight: ["400", "500"],
  variable: "--font-mono",
});
