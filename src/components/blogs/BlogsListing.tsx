import Link from "next/link";
import HomeToolTeasers from "@/components/home/HomeToolTeasers";
import {
  BlogsFeaturedCard,
  HomePostCard,
} from "@/components/home/HomePostCard";
import Pagination from "@/components/Pagination";
import config from "@/lib/config";
import { matchingSearchTools } from "@/lib/homeTools";
import { IPostData } from "@/types";

type Props = {
  posts: IPostData[];
  currentPage: number;
  totalPages: number;
  total: number;
  searchQuery: string;
  title?: string;
  description?: string;
  basePath?: string;
  activeTagSlug?: string;
};

const HERO_TOOLS = [
  { href: "/tools/upwork-fee-calculator", label: "Upwork Fee" },
  { href: "/tools/freelance-rate-calculator", label: "Freelance Rate" },
  { href: "/tools/upwork-connects-calculator", label: "Upwork Connects" },
  { href: "/tools/fiverr-fee-calculator", label: "Fiverr Fee" },
];

const BLOGS_TICKS = [
  "Upwork profiles, proposals, Connects and fees",
  "Fiverr fees, seller levels and first orders",
  "Getting paid in Pakistan: JazzCash, Easypaisa, Payoneer",
  "Beginner guides to platforms, niches and rates",
];

const chipActive =
  "chip inline-flex h-[var(--control-h)] max-h-[var(--chip-h-max)] items-center rounded-full border border-[#0f766e] bg-[#0f766e] px-4 text-[16px] font-semibold text-white hover:bg-[#115e59] hover:text-white";
const chipIdle =
  "chip inline-flex h-[var(--control-h)] max-h-[var(--chip-h-max)] items-center rounded-full border border-[#cbd5e1] bg-white px-4 text-[16px] font-semibold text-[#334155] transition hover:border-[#0f766e] hover:bg-[#f0fdfa] hover:text-[#115e59]";

const heroField =
  "h-[var(--control-h-hero)] max-h-[var(--control-h-hero)] min-w-0 flex-1 rounded-lg border border-[#7b8798] bg-white px-4 text-[16px] leading-none text-ink placeholder:text-[#64748b]";
const heroBtn =
  "inline-flex h-[var(--control-h-hero)] max-h-[var(--control-h-hero)] shrink-0 items-center justify-center rounded-lg bg-[#0f766e] px-5 text-[16px] font-semibold leading-none text-white transition hover:bg-[#115e59] hover:text-white";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mt-1 h-4 w-4 flex-none text-[#0f766e]"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0z" />
    </svg>
  );
}

function TopicsNav({
  allGuidesCurrent,
  activeTagSlug,
}: {
  allGuidesCurrent: boolean;
  activeTagSlug?: string;
}) {
  return (
    <nav id="topics" aria-label="Browse by topic" className="mt-6">
      <p className="home-mute text-[12px] font-bold uppercase tracking-[0.08em]">
        Topics
      </p>
      <ul className="mt-2 m-0 flex list-none flex-wrap gap-2">
        <li className="m-0 list-none">
          <Link
            href="/blogs"
            aria-current={allGuidesCurrent ? "page" : undefined}
            className={allGuidesCurrent ? chipActive : chipIdle}
          >
            All guides
          </Link>
        </li>
        {config.POPULAR_TAGS.map((tag) => {
          const current = tag.slug === activeTagSlug;
          return (
            <li key={tag.slug} className="m-0 list-none">
              <Link
                href={`/tags/${tag.slug}`}
                aria-current={current ? "page" : undefined}
                className={current ? chipActive : chipIdle}
              >
                {tag.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SearchForm({
  action,
  searchQuery,
}: {
  action: string;
  searchQuery: string;
}) {
  return (
    <form role="search" action={action} method="get">
      <label htmlFor="q" className="sr-only">
        Search guides
      </label>
      <div className="flex gap-2">
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={searchQuery}
          autoComplete="off"
          placeholder="Search guides"
          className={heroField}
        />
        <button type="submit" className={heroBtn}>
          Search
        </button>
      </div>
    </form>
  );
}

const BlogsListing = ({
  posts,
  currentPage,
  totalPages,
  total,
  searchQuery,
  title = "Freelancing articles and Upwork guides",
  description = "Practical guides on freelancing. Browse the archive below, or open a category when you already know the kind of problem you need to solve.",
  basePath = "/blogs",
  activeTagSlug,
}: Props) => {
  const isSearch = Boolean(searchQuery);
  const featured = !isSearch ? posts[0] : undefined;
  const gridPosts = featured ? posts.slice(1) : posts;
  const start = total === 0 ? 0 : (currentPage - 1) * config.BLOGS_PER_PAGE + 1;
  const end = (currentPage - 1) * config.BLOGS_PER_PAGE + posts.length;
  const shortcuts = isSearch ? matchingSearchTools(searchQuery) : [];
  const allGuidesCurrent = !isSearch && !activeTagSlug && basePath === "/blogs";
  const toolsHero =
    currentPage === 1 && basePath === "/blogs" && !activeTagSlug;
  const gridHeading = isSearch
    ? `Results for “${searchQuery}”`
    : currentPage === 1
      ? "Latest guides"
      : `Guides, page ${currentPage}`;

  return (
    <div className="home-page">
      {toolsHero ? (
        <div className="bg-mist">
          <section
            aria-labelledby="h1"
            className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)] gap-5 px-4 pb-6 pt-4 sm:px-5 md:pt-8 min-[1024px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] min-[1024px]:items-end min-[1024px]:gap-x-14 min-[1024px]:px-8 min-[1024px]:pb-6 min-[1024px]:pt-10"
          >
            <div>
              <nav aria-label="Breadcrumb">
                <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0 text-[16px] font-semibold text-mute">
                  <li className="m-0">
                    <Link
                      href="/"
                      className="inline-flex min-h-[var(--control-h)] min-w-[var(--control-h)] items-center rounded hover:text-ink hover:underline underline-offset-4"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="m-0" aria-hidden="true">
                    /
                  </li>
                  <li className="m-0 text-[#0f766e]" aria-current="page">
                    Blogs
                  </li>
                </ol>
              </nav>
              <h1
                id="h1"
                className="text-balance font-display text-[30px] font-bold leading-[1.2] tracking-tight text-ink md:mt-1 md:text-[44px] md:leading-[1.15]"
              >
                {title}
              </h1>
              <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-[#334155] md:mt-4 md:text-[18px]">
                {description}
              </p>
            </div>
            <div>
              <SearchForm action={basePath} searchQuery={searchQuery} />
              <ul
                className="mt-5 hidden list-none space-y-2 p-0 text-[16px] leading-snug text-[#334155] min-[1024px]:block"
                aria-label="What the guides cover"
              >
                {BLOGS_TICKS.map((item) => (
                  <li key={item} className="m-0 flex gap-2.5">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <div className="mx-auto max-w-[1200px] px-4 pb-10 pt-4 sm:px-5 min-[1024px]:px-8 min-[1024px]:pb-12 min-[1024px]:pt-2">
            {!isSearch ? (
              <div className="flex items-center gap-3">
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0f766e]">
                  Latest
                </p>
                <span aria-hidden="true" className="h-px flex-1 bg-[#cbd5e1]" />
                <p className="text-[14px] text-mute">
                  {total} {total === 1 ? "post" : "posts"}
                </p>
              </div>
            ) : null}
            <TopicsNav
              allGuidesCurrent={allGuidesCurrent}
              activeTagSlug={activeTagSlug}
            />
          </div>
        </div>
      ) : (
        <section aria-labelledby="h1" className="bg-mist">
          <div className="home-inner pb-10 pt-8 min-[1024px]:pb-12 min-[1024px]:pt-12">
            <div className="grid gap-x-14 gap-y-4 min-[1024px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] min-[1024px]:items-end">
              <h1
                id="h1"
                className="font-display text-[30px] font-bold leading-[1.2] tracking-tight text-ink md:text-[44px] md:leading-[1.15]"
              >
                {title}
              </h1>
              <p className="home-body text-[16px] leading-relaxed md:text-[18px]">
                {description}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
              <div className="w-full min-[1024px]:max-w-[560px]">
                <SearchForm action={basePath} searchQuery={searchQuery} />
                <p className="home-mute mt-2 text-[16px] leading-snug">
                  New articles land here first. Use search if you are looking
                  for a specific platform, skill, or workflow.
                </p>
              </div>
              <p className="home-body hidden items-center gap-1 text-[16px] min-[1024px]:flex">
                <span className="home-mute mr-2 text-[12px] font-bold uppercase tracking-[0.08em]">
                  Free calculators
                </span>
                {HERO_TOOLS.map((tool, index) => (
                  <span
                    key={tool.href}
                    className="inline-flex items-center gap-1"
                  >
                    {index > 0 ? (
                      <span aria-hidden="true" className="home-mute">
                        ·
                      </span>
                    ) : null}
                    <Link href={tool.href} className="home-link">
                      {tool.label}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
            <TopicsNav
              allGuidesCurrent={allGuidesCurrent}
              activeTagSlug={activeTagSlug}
            />
          </div>
        </section>
      )}

      <div className="home-inner pb-14 lg:pb-20">
        <p id="announce" className="sr-only" role="status" aria-live="polite">
          {isSearch
            ? total
              ? `${total} guides found for ${searchQuery}`
              : `No guides found for ${searchQuery}`
            : ""}
        </p>

        {isSearch ? (
          <section aria-labelledby="res-h" className="mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h2
                id="res-h"
                className="font-display text-[24px] font-bold text-ink md:text-[30px]"
              >
                {gridHeading}
              </h2>
              <Link href={basePath} className="home-link text-[16px]">
                Clear search
              </Link>
            </div>
            <p className="home-mute mt-1 text-[16px]">
              {total
                ? `${total} guides${totalPages > 1 ? ` across all ${totalPages} pages.` : "."}`
                : "0 guides found."}
            </p>
            {shortcuts.length > 0 && (
              <ul className="mt-5 m-0 grid list-none gap-3 lg:grid-cols-2">
                {shortcuts.map((tool) => (
                  <li key={tool.href} className="m-0 list-none">
                    <Link
                      href={tool.href}
                      className="group flex min-h-16 items-center justify-between gap-4 rounded-xl border border-[#0f766e] bg-[#f0fdfa] px-4 py-3 hover:bg-white"
                    >
                      <span>
                        <span className="home-eyebrow block">Calculator</span>
                        <span className="mt-0.5 block text-[18px] font-semibold text-ink">
                          {tool.title}
                        </span>
                        <span className="home-body block text-[16px]">
                          {tool.blurb}
                        </span>
                      </span>
                      <span className="flex-none text-[16px] font-semibold text-[#0f766e]">
                        Open →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {posts.length > 0 ? (
              <ul className="mt-6 m-0 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post, index) => (
                  <li key={post.fields.slug} className="m-0 h-full list-none">
                    <HomePostCard post={post} priority={index < 3} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-[#7b8798] bg-white p-6 text-center sm:p-10">
                <h3 className="mt-0 font-display text-[20px] font-bold text-ink md:text-[24px]">
                  No guides match “{searchQuery}”
                </h3>
                <p className="home-body mx-auto mt-2 max-w-[52ch] text-[16px] leading-relaxed">
                  Check the spelling or try one broader word, such as “Upwork”,
                  “proposal” or “fees”. You can also browse by topic or open a
                  calculator.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href={basePath} className="home-btn-primary">
                    Clear search
                  </Link>
                  <Link href="#topics" className="home-btn-secondary">
                    Browse topics
                  </Link>
                </div>
              </div>
            )}
          </section>
        ) : (
          <>
            {featured && <BlogsFeaturedCard post={featured} />}
            <section aria-labelledby="grid-h" className="mt-12">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h2
                  id="grid-h"
                  className="font-display text-[24px] font-bold text-ink md:text-[30px]"
                >
                  {gridHeading}
                </h2>
                <p className="home-mute text-[16px]">
                  Page {currentPage} of {totalPages} · guides {start}–{end} of{" "}
                  {total}
                </p>
              </div>
              {gridPosts.length > 0 ? (
                <ul className="mt-6 m-0 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {gridPosts.map((post, index) => (
                    <li key={post.fields.slug} className="m-0 h-full list-none">
                      <HomePostCard
                        post={post}
                        priority={!featured && index < 3}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          </>
        )}

        <Pagination
          basePath={basePath}
          currentPage={currentPage}
          pages={totalPages}
          searchQuery={searchQuery}
        />
      </div>

      <HomeToolTeasers
        heading="Not sure what you’ll keep, charge or spend?"
        sub="Check a number before you take the job. Each card shows its own example; open one to use your figures."
        className="border-t border-line"
      />
    </div>
  );
};

export default BlogsListing;
