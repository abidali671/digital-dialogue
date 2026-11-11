import Link from "next/link";
import { IPostData } from "@/types";
import { formatLongDate, formatShortDate, getPublishedDate } from "@/helper";
import { contentfulImageUrl } from "@/lib/contentfulImage";

function postHref(post: IPostData) {
  return `/blogs/${post.fields.category.fields.slug}/${post.fields.slug}`;
}

interface Props {
  featured?: IPostData;
  picks: IPostData[];
}

const HomeFeaturedAndPicks = ({ featured, picks }: Props) => {
  if (!featured && !picks.length) return null;

  return (
    <section aria-labelledby="start-h" className="bg-white">
      <div className="home-inner py-14 lg:py-20">
        <p className="home-eyebrow">Featured</p>
        <h2 id="start-h" className="home-h2">
          Featured guide and Editor’s Picks
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-8">
          {featured && (
            <Link
              href={postHref(featured)}
              className="home-pc group rounded-2xl"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-mist-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={contentfulImageUrl(
                    featured.fields.coverImage.fields.file.url,
                    1200,
                  )}
                  alt={featured.fields.title}
                  width={1200}
                  height={675}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="home-eyebrow">
                  Featured · {featured.fields.category.fields.label}
                </p>
                <h3 className="home-pc-t mt-3 font-display text-[20px] font-bold leading-snug text-ink md:text-[24px]">
                  {featured.fields.title}
                </h3>
                <p className="home-body mt-3 text-[16px] leading-relaxed md:text-[18px]">
                  {featured.fields.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <p className="home-mute text-[14px] tabular-nums">
                    {formatLongDate(getPublishedDate(featured))}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#0f766e] group-hover:text-[#115e59]">
                    Read Article
                  </span>
                </div>
              </div>
            </Link>
          )}
          {picks.length > 0 && (
            <div className="lg:h-full">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#334155]">
                Editor’s Picks
              </h3>
              <ol className="mt-3 m-0 flex list-none flex-col gap-3 lg:h-[calc(100%-2rem)]">
                {picks.map((post, index) => (
                  <li key={post.fields.slug} className="m-0 list-none lg:flex-1">
                    <Link
                      href={postHref(post)}
                      className="home-pc group flex h-full min-h-[88px] flex-row items-center gap-4 rounded-xl p-3"
                    >
                      <span
                        aria-hidden="true"
                        className="w-7 flex-none text-center text-[14px] font-bold tabular-nums text-[#0f766e]"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="relative block aspect-video w-24 flex-none overflow-hidden rounded-lg bg-mist-soft sm:w-28">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={contentfulImageUrl(
                            post.fields.coverImage.fields.file.url,
                            800,
                          )}
                          alt={post.fields.title}
                          width={800}
                          height={450}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="home-eyebrow block">
                          {post.fields.category.fields.label}
                        </span>
                        <h4 className="home-pc-t mt-1 font-display text-[18px] font-semibold leading-snug text-ink md:text-[20px]">
                          {post.fields.title}
                        </h4>
                        <span className="home-mute mt-1 block text-[14px] tabular-nums">
                          {formatShortDate(getPublishedDate(post))}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturedAndPicks;
