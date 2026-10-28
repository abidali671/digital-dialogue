import React from "react";
import Link from "next/link";
import ContentContainer from "../ContentContainer";
import { IPostData } from "@/types";
import config from "@/lib/config";
import { formatLongDate, getPublishedDate } from "@/helper";
import { contentfulImageUrl } from "@/lib/contentfulImage";

interface IProps {
  posts: IPostData[];
}

const Hero = ({ posts }: IProps) => {
  const post = posts[0];

  return (
    <section className="border-b border-white/5 bg-ink">
      <ContentContainer className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1fr]">
        <div className="animate-fade-up">
          <p className="mb-5 font-mono text-caption uppercase tracking-[0.14em] text-accent">
            {config.SITE_NAME}
          </p>
          <h1 className="mb-5 font-display text-h1 text-white">
            Practical Freelancing tips for Beginners on Upwork, Fiverr
          </h1>
          <p className="mb-8 max-w-md text-lead text-white/70">
            Profiles, proposals, platforms, and fees — based on real client
            work, not theory dumps.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/blogs"
              className="rounded-lg bg-accent px-6 py-3 text-ui font-bold text-white transition-colors hover:bg-accent-hover hover:text-white"
            >
              Start reading
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-white/20 px-6 py-3 text-ui font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              About the site
            </Link>
          </div>
        </div>

        {post && (
          <Link
            href={`/blogs/${post.fields.category.fields.slug}/${post.fields.slug}`}
            className="group block animate-fade-in overflow-hidden rounded-xl border border-white/10 bg-white/5"
          >
            <div className="relative h-56 w-full overflow-hidden md:h-64">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={contentfulImageUrl(
                  post.fields.coverImage.fields.file.url,
                  1200,
                )}
                alt={post.fields.title}
                width={1200}
                height={675}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col gap-3 p-6">
              <p className="font-mono text-caption uppercase tracking-[0.1em] text-accent">
                Featured · {post.fields.category.fields.label}
              </p>
              <h2 className="font-display text-h3 text-white transition-colors group-hover:text-accent">
                {post.fields.title}
              </h2>
              <p className="text-copy text-white/70 line-clamp-2">
                {post.fields.excerpt}
              </p>
              <p className="font-mono text-caption text-white/40">
                {formatLongDate(getPublishedDate(post))}
              </p>
            </div>
          </Link>
        )}
      </ContentContainer>
    </section>
  );
};

export default Hero;
