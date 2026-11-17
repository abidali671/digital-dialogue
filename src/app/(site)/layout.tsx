export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="container-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {children}
    </main>
  );
}
