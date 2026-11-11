import Link from "next/link";
import { IPostData } from "@/types";
import { formatLongDate, getPublishedDate } from "@/helper";
import { contentfulImageUrl } from "@/lib/contentfulImage";

function postHref(post: IPostData) {
  return `/blogs/${post.fields.category.fields.slug}/${post.fields.slug}`;
}

export function HomePostCard({
  post,
  priority = false,
}: {
  post: IPostData;
  priority?: boolean;
}) {
  return (
    <Link href={postHref(post)} className="home-pc group">
      <div className="relative aspect-video w-full overflow-hidden bg-mist-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={contentfulImageUrl(post.fields.coverImage.fields.file.url, 800)}
          alt={post.fields.title}
          width={800}
          height={450}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="home-eyebrow flex items-center gap-2">
          <span aria-hidden="true" className="h-px w-6 bg-[#0f766e]" />
          {post.fields.category.fields.label}
        </p>
        <h3 className="home-pc-t mt-3 font-display text-[18px] font-semibold leading-snug text-ink md:text-[20px]">
          {post.fields.title}
        </h3>
        <p className="home-body mt-2 text-[16px] leading-relaxed">
          {post.fields.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="home-mute text-[14px] tabular-nums">
            {formatLongDate(getPublishedDate(post))}
          </p>
          <span className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#0f766e] group-hover:text-[#115e59]">
            Read Article
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogsFeaturedCard({ post }: { post: IPostData }) {
  return (
    <section aria-label="Featured guide" className="mt-8">
      <Link
        href={postHref(post)}
        className="home-pc group grid overflow-hidden rounded-2xl lg:grid-cols-[1.15fr_1fr]"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-mist-soft lg:aspect-auto lg:h-full lg:min-h-[320px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={contentfulImageUrl(post.fields.coverImage.fields.file.url, 1200)}
            alt={post.fields.title}
            width={1200}
            height={675}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
          <p className="home-eyebrow">
            Featured · {post.fields.category.fields.label}
          </p>
          <h2 className="home-pc-t mt-3 font-display text-[24px] font-bold leading-snug text-ink md:text-[30px]">
            {post.fields.title}
          </h2>
          <p className="home-body mt-3 text-[16px] leading-relaxed md:text-[18px]">
            {post.fields.excerpt}
          </p>
          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="home-mute text-[14px] tabular-nums">
              {formatLongDate(getPublishedDate(post))}
            </p>
            <span className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#0f766e] group-hover:text-[#115e59]">
              Read Article
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
