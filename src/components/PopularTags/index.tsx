import React from "react";
import ContentContainer from "../ContentContainer";
import Tag from "../Tag";
import Title from "../Title";
import config from "@/lib/config";

/** Config-driven links to high-value tag listing pages. */
const PopularTags = () => {
  const tags = config.POPULAR_TAGS;
  if (!tags.length) return null;

  return (
    <section className="border-b border-line bg-mist">
      <ContentContainer className="py-14 md:py-16">
        <div className="flex flex-col gap-2">
          <Title as="h2">Popular tags</Title>
          <p className="max-w-xl text-base text-mute">
            Follow a topic into related guides without digging through the full
            archive.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag.slug} href={`/tags/${tag.slug}`}>
              {tag.label}
            </Tag>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default PopularTags;
