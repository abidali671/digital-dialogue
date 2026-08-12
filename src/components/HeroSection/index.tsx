import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContentContainer from "../ContentContainer";
import { IPostData } from "@/types";
import config from "@/lib/config";

interface IProps {
  posts: IPostData[];
}

const Hero = ({ posts }: IProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const post = useMemo(() => posts[currentSlide], [currentSlide, posts]);

  const handleNextSlide = useCallback(() => {
    if (!posts.length) return;
    setCurrentSlide((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
    setAnimKey((k) => k + 1);
  }, [posts.length]);

  useEffect(() => {
    if (posts.length < 2) return;
    const timeout = setInterval(handleNextSlide, 7000);
    return () => clearInterval(timeout);
  }, [handleNextSlide, posts.length]);

  if (!post) return null;

  return (
    <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-ink md:min-h-[86vh]">
      <Image
        key={post.sys.id}
        src={"https:" + post.fields.coverImage.fields.file.url}
        alt={post.fields.coverImage.fields.description || post.fields.title}
        fill
        priority
        className="object-cover animate-fade-in"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-accent/25" />

      <ContentContainer className="relative z-10 w-full pb-14 pt-28 md:pb-20">
        <div key={animKey} className="max-w-2xl animate-fade-up text-white">
          <p className="mb-5 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
            {config.SITE_NAME}
          </p>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-accent-soft">
            Featured · {post.fields.category.fields.label}
          </p>
          <h1 className="mb-4 font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
            {post.fields.title}
          </h1>
          <p className="mb-8 max-w-xl text-base text-white/80 line-clamp-2 md:text-lg">
            {post.fields.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={{
                pathname: "/blogs/[category]/[blog_detail]",
                query: {
                  category: post.fields.category.fields.slug,
                  blog_detail: post.fields.slug,
                },
              }}
              className="rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-hover hover:text-white"
            >
              Read full article
            </Link>
            {posts.length > 1 && (
              <div className="flex items-center gap-2">
                {posts.map((item, index) => (
                  <button
                    key={item.sys.id}
                    type="button"
                    aria-label={`Show featured post ${index + 1}`}
                    onClick={() => {
                      setCurrentSlide(index);
                      setAnimKey((k) => k + 1);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.sys.id === post.sys.id
                        ? "w-8 bg-accent"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default Hero;
