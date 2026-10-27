"use client";

import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ContentContainer from "@/components/ContentContainer";
import PostSearch from "@/components/PostSearch";
import Title from "@/components/Title";
import { TOOL_ARTICLES, TOOL_FAQS, TOOLS_INTRO } from "@/lib/toolsHub";

export type ToolCard = {
  href: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
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
        <Title>Freelance calculators for Pakistan</Title>
        {!searchQuery && (
          <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-mute">
            {TOOLS_INTRO.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
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
                    alt={tool.alt}
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
                  <p className="text-sm leading-relaxed text-mute md:text-base">
                    {tool.copy}
                  </p>
                  <p className="post-card-read-text">Open calculator</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {!searchQuery && (
          <>
            <section className="mt-16 border-t border-line pt-12" aria-labelledby="tools-guides-title">
              <h2 id="tools-guides-title" className="font-display text-3xl font-bold tracking-tight text-ink">
                Freelancing guides
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-mute">
                Articles already on the site that sit next to these calculators. They stay on freelancing: fees, Connects, pricing, proposals and choosing a platform from Pakistan.
              </p>
              <ul className="mt-8 grid gap-6 md:grid-cols-2">
                {TOOL_ARTICLES.map((article) => (
                  <li key={article.href} className="border-t border-line pt-4">
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                      <Link className="hover:text-accent" href={article.href}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-2 leading-relaxed text-mute">{article.copy}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section className="mt-16 border-t border-line pt-12" aria-labelledby="tools-faq-title">
              <h2 id="tools-faq-title" className="font-display text-3xl font-bold tracking-tight text-ink">
                Questions about these calculators
              </h2>
              <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
                {TOOL_FAQS.map((item) => (
                  <div key={item.question} className="py-5">
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                      {item.question}
                    </h3>
                    <p className="mt-2 leading-relaxed text-mute">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </ContentContainer>
    </div>
  );
}
