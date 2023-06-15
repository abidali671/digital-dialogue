import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { useReadingTime } from "../../hooks/readingTime";
import { Arrow } from "@/assets/icon";

interface CardPropsT {
  data: any;
}

const PostCard = ({ data }: CardPropsT) => {
  const { category, coverImage, title, exerpt, slug } = data.fields;
  const { createdAt } = data.sys;

  const readingTime = useReadingTime(exerpt); //reading time hook

  return (
    <div className="post-card-root">
      <div className="post-card-cover-wrapper">
        <Image
          src={"https:" + coverImage.fields.file.url}
          alt={coverImage.fields.title}
          width={396}
          height={240}
        />
        {coverImage.fields.description && (
          <div
            className="post-card-description"
            dangerouslySetInnerHTML={{ __html: coverImage.fields.description }}
          />
        )}
      </div>
      <div className="post-card-content-wrapper">
        <span className="post-card-label-wrapper">
          <hr className="post-card-label-line" />
          <p>{category.fields.label}</p>
        </span>
        <h5 className="post-card-title">{title}</h5>
        <p className="post-card-excerpt">{exerpt}</p>
        <p className="post-card-created-date">
          {moment(createdAt).format("MMMM DD, YYYY")}
          <span className="post-card-dot"></span> {readingTime} min read
        </p>

        <Link
          href={{
            pathname: "/blogs/[category]/[blog_detail]",
            query: { category: category.fields.slug, blog_detail: slug },
          }}
          className="post-card-read-text"
        >
          Read Article
          <Arrow height={24} width={24} />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
