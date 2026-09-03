import React from "react";
import Link from "next/link";
import ContentContainer from "../ContentContainer";
import Title from "../Title";
import { ICategoryData } from "@/types";

interface IProps {
  categories: ICategoryData[];
}

function categoryBlurb(category: ICategoryData) {
  const { label, description } = category.fields;
  if (description?.trim()) {
    return description.replace(/\s+/g, " ").trim();
  }
  return `Practical ${label.toLowerCase()} guides, tips, and next steps.`;
}

/** Topic hubs linking each category listing page. */
const CategoryHubs = ({ categories }: IProps) => {
  if (!categories.length) return null;

  return (
    <section className="border-b border-line bg-white">
      <ContentContainer className="py-14 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Title as="h2">Browse by topic</Title>
            <p className="max-w-xl text-base text-mute">
              Jump into a category and find guides that match the work you are
              doing right now.
            </p>
          </div>
          <Link href="/blogs" className="link-underline text-sm">
            View all posts
          </Link>
        </div>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const { label, slug } = category.fields;
            return (
              <Link
                key={slug}
                href={`/blogs/${slug}`}
                className="group flex flex-col gap-2 border-t border-line pt-5"
              >
                <h3 className="font-display text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
                  {label}
                </h3>
                <p className="text-base leading-relaxed text-mute">
                  {categoryBlurb(category)}
                </p>
                <span className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-accent">
                  Explore {label}
                </span>
              </Link>
            );
          })}
        </div>
      </ContentContainer>
    </section>
  );
};

export default CategoryHubs;
