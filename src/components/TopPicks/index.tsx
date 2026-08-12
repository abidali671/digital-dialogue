import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import ContentContainer from "../ContentContainer";
import { IPostData } from "@/types";

interface IProps {
  posts: IPostData[];
}

/** Numbered editorial list of hand-picked posts, shown under the hero. */
const TopPicks = ({ posts }: IProps) => {
  if (!posts.length) return null;

  return (
    <section className="border-b border-line bg-white">
      <ContentContainer className="py-14 md:py-16">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.14em] text-mute">
          Editor&apos;s picks
        </p>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
          {posts.map((post, index) => (
            <Link
              key={post.fields.slug}
              href={`/blogs/${post.fields.category.fields.slug}/${post.fields.slug}`}
              className="group flex gap-4 border-t border-line pt-5"
            >
              <span className="font-mono text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col gap-2">
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
                  {post.fields.category.fields.label}
                </p>
                <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-ink transition-colors line-clamp-2 group-hover:text-accent">
                  {post.fields.title}
                </h3>
                <p className="font-mono text-xs text-mute-soft">
                  {moment(post.sys.createdAt).format("MMM DD, YYYY")}
                </p>
              </div>
              <div className="relative hidden h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-mist-soft sm:block">
                <Image
                  src={"https:" + post.fields.coverImage.fields.file.url}
                  alt={
                    post.fields.coverImage.fields.description ||
                    post.fields.title
                  }
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
              </div>
            </Link>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default TopPicks;
