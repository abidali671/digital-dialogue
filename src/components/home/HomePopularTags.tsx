import Link from "next/link";
import config from "@/lib/config";

const HomePopularTags = () => {
  const tags = config.POPULAR_TAGS;
  if (!tags.length) return null;

  return (
    <section
      aria-labelledby="tags-h"
      className="border-t border-line bg-white"
    >
      <div className="home-inner py-14 lg:py-16">
        <p className="home-eyebrow">Browse</p>
        <h2 id="tags-h" className="home-h2">
          Popular tags
        </h2>
        <p className="home-body mt-2 max-w-[62ch] text-[16px] leading-relaxed">
          Follow a topic into related guides without digging through the full
          archive.
        </p>
        <ul className="mt-6 m-0 flex list-none flex-wrap gap-3">
          {tags.map((tag) => (
            <li key={tag.slug} className="m-0 list-none">
              <Link
                href={`/tags/${tag.slug}`}
                className="inline-flex min-h-[44px] items-center rounded-full border border-[#cbd5e1] bg-white px-4 text-[16px] font-semibold text-[#334155] transition hover:border-[#0f766e] hover:bg-[#f0fdfa] hover:text-[#115e59]"
              >
                {tag.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomePopularTags;
