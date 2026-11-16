import { bodyFont, displayFont, monoFont } from "@/lib/fonts";

const fontClasses = `${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} ${displayFont.className} ${monoFont.className} ${bodyFont.className}`;

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      id="main"
      tabIndex={-1}
      className={`${fontClasses} container-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
    >
      {children}
    </main>
  );
}
