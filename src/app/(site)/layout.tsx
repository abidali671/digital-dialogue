export default function SiteLayout({
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
