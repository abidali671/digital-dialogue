import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { Arrow } from "@/assets/icon";
import { IPostData } from "@/types";

interface CardPropsT {
  data: IPostData;
}

const PostCard = ({ data }: CardPropsT) => {
  const { category, coverImage, title, excerpt, slug } = data.fields;
  const { createdAt } = data.sys;

  return (
    <div className="post-card-root">
      <div className="post-card-cover-wrapper">
        <Image
          src={"https:" + coverImage.fields.file.url}
          alt={coverImage.fields.description}
          width={396}
          height={240}
        />
      </div>
      <div className="post-card-content-wrapper">
        <Link
          href={{
            pathname: "/blogs/[category]",
            query: { category: category.fields.slug },
          }}
          className="post-card-label-wrapper"
        >
          <hr className="post-card-label-line" />
          <p>{category.fields.label}</p>
        </Link>
        <Link
          href={{
            pathname: "/blogs/[category]/[blog_detail]",
            query: { category: category.fields.slug, blog_detail: slug },
          }}
          className="post-card-title"
        >
          {title}
        </Link>
        <Link
          href={{
            pathname: "/blogs/[category]/[blog_detail]",
            query: { category: category.fields.slug, blog_detail: slug },
          }}
          className="post-card-excerpt"
        >
          {excerpt}
        </Link>
        <Link
          href={{
            pathname: "/blogs/[category]/[blog_detail]",
            query: { category: category.fields.slug, blog_detail: slug },
          }}
          className="post-card-created-date"
        >
          {moment(createdAt).format("MMMM DD, YYYY")}
        </Link>

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
