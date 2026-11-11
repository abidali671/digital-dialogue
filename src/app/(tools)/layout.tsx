export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="main" tabIndex={-1} className="container-body focus:outline-none">
      {children}
    </main>
  );
}
