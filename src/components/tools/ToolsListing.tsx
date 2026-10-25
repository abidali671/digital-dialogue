"use client";

import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ContentContainer from "@/components/ContentContainer";
import PostSearch from "@/components/PostSearch";
import Title from "@/components/Title";

export type ToolCard = {
  href: string;
  title: string;
  copy: string;
  image: string;
};

export default function ToolsListing({
  tools,
  searchQuery,
}: {
  tools: ToolCard[];
  searchQuery: string;
}) {
  return (
    <div className="relative pb-16">
      <PostSearch
        searchQuery={searchQuery}
        basePath="/tools"
        placeholder="Search tools"
        label="Search tools"
      />
      <ContentContainer className="relative flex flex-col justify-center pt-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />
        <Title>Freelancing tools</Title>
        {!searchQuery && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-mute">
            Short calculators for fees and pricing. Each one states its assumptions.
          </p>
        )}
        {searchQuery && (
          <p className="mt-4 text-sm text-mute">
            Showing results for “{searchQuery}”
          </p>
        )}
        {tools.length === 0 ? (
          <p className="mt-10 text-mute">No tools match “{searchQuery}”.</p>
        ) : (
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <Link key={tool.href} href={tool.href} className="post-card-root">
                <div className="post-card-cover-wrapper">
                  <Image
                    src={tool.image}
                    alt=""
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="post-card-content-wrapper">
                  <div className="post-card-label-wrapper">
                    <hr className="post-card-label-line" />
                    <p>Tool</p>
                  </div>
                  <p className="post-card-title">{tool.title}</p>
                  <p className="post-card-excerpt">{tool.copy}</p>
                  <p className="post-card-read-text">Open calculator</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </ContentContainer>
    </div>
  );
}
