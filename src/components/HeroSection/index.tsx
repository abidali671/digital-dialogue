import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import ContentContainer from "../ContentContainer";
import { IPostData } from "@/types";
import config from "@/lib/config";

interface IProps {
  posts: IPostData[];
}

const Hero = ({ posts }: IProps) => {
  const post = posts[0];

  return (
    <section className="border-b border-white/5 bg-ink">
      <ContentContainer className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1fr]">
        <div className="animate-fade-up">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-accent">
            {config.SITE_NAME}
          </p>
          <h1 className="mb-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
            Practical writing on freelancing, technology and building things
            that ship.
          </h1>
          <p className="mb-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
            No fluff, no theory dumps. Just guides, teardowns and tools from
            people who actually do the work.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/blogs"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-hover hover:text-white"
            >
              Start reading
            </Link>
            <Link
              href="/authors"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              Meet the authors
            </Link>
          </div>
        </div>

        {post && (
          <Link
            href={{
              pathname: "/blogs/[category]/[blog_detail]",
              query: {
                category: post.fields.category.fields.slug,
                blog_detail: post.fields.slug,
              },
            }}
            className="group block animate-fade-in overflow-hidden rounded-xl border border-white/10 bg-white/5"
          >
            <div className="relative h-56 w-full overflow-hidden md:h-64">
              <Image
                src={"https:" + post.fields.coverImage.fields.file.url}
                alt={
                  post.fields.coverImage.fields.description || post.fields.title
                }
                fill
                priority
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col gap-3 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-accent">
                Featured · {post.fields.category.fields.label}
              </p>
              <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-accent md:text-3xl">
                {post.fields.title}
              </h2>
              <p className="text-base text-white/70 line-clamp-2">
                {post.fields.excerpt}
              </p>
              <p className="font-mono text-xs text-white/40">
                {moment(post.sys.createdAt).format("MMMM DD, YYYY")}
              </p>
            </div>
          </Link>
        )}
      </ContentContainer>
    </section>
  );
};

export default Hero;
