import React from "react";
import Link from "next/link";
import { IPostData } from "@/types";
import { formatLongDate, getPublishedDate } from "@/helper";
import { contentfulImageUrl } from "@/lib/contentfulImage";

interface CardPropsT {
  data: IPostData;
  priority?: boolean;
}

const PostCard = ({ data, priority = false }: CardPropsT) => {
  const { category, coverImage, title, excerpt, slug } = data.fields;
  const publishedAt = getPublishedDate(data);

  return (
    <Link
      href={`/blogs/${category.fields.slug}/${slug}`}
      className="post-card-root"
    >
      <div className="post-card-cover-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={contentfulImageUrl(coverImage.fields.file.url, 800)}
          alt={title}
          width={800}
          height={450}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className="post-card-content-wrapper">
        <div className="post-card-label-wrapper">
          <hr className="post-card-label-line" />
          <p>{category.fields.label}</p>
        </div>
        <p className="post-card-title">{title}</p>
        <p className="post-card-excerpt">{excerpt}</p>
        <p className="post-card-created-date">
          {formatLongDate(publishedAt)}
        </p>

        <p className="post-card-read-text">Read Article</p>
      </div>
    </Link>
  );
};

export default PostCard;
