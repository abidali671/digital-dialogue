export default function Loading() {
  return (
    <div className="home-page" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading article</span>
      <div className="home-inner py-10">
        <div className="h-4 w-40 rounded bg-mist-soft" />
        <div className="mt-6 h-10 max-w-2xl rounded-lg bg-mist-soft" />
        <div className="mt-4 aspect-video rounded-2xl bg-mist-soft" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full rounded bg-mist-soft" />
          <div className="h-4 w-5/6 rounded bg-mist-soft" />
          <div className="h-4 w-4/6 rounded bg-mist-soft" />
        </div>
      </div>
    </div>
  );
}
