/** Shared listing placeholder for /blogs, category, and tag routes. */
export default function BlogsListingSkeleton() {
  return (
    <div className="home-page" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading guides</span>
      <section className="bg-mist">
        <div className="home-inner pb-10 pt-8 lg:pb-12 lg:pt-12">
          <div className="h-10 max-w-md rounded-lg bg-mist-soft" />
          <div className="mt-4 h-5 max-w-xl rounded bg-mist-soft" />
          <div className="mt-6 h-10 max-w-lg rounded-lg bg-mist-soft" />
        </div>
      </section>
      <section className="bg-white">
        <div className="home-inner py-10">
          <div className="overflow-hidden rounded-2xl border border-line">
            <div className="aspect-video bg-mist-soft lg:aspect-auto lg:min-h-[320px]" />
          </div>
          <ul className="mt-8 m-0 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <li key={index} className="m-0 list-none">
                <div className="overflow-hidden rounded-2xl border border-line">
                  <div className="aspect-video bg-mist-soft" />
                  <div className="space-y-3 p-5">
                    <div className="h-3 w-24 rounded bg-mist-soft" />
                    <div className="h-5 w-full rounded bg-mist-soft" />
                    <div className="h-5 w-3/4 rounded bg-mist-soft" />
                    <div className="h-4 w-1/2 rounded bg-mist-soft" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
