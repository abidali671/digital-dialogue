import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { Arrow } from "@/assets/icon";
import { IPostData } from "@/types";
import directLink from "@/lib/directLink";

interface CardPropsT {
  data: IPostData;
}

const PostCard = ({ data }: CardPropsT) => {
  const { category, coverImage, title, excerpt, slug } = data.fields;
  const { createdAt } = data.sys;

  return (
    <Link
      href={{
        pathname: "/blogs/[category]/[blog_detail]",
        query: { category: category.fields.slug, blog_detail: slug },
      }}
      onClick={directLink}
      className="post-card-root"
    >
      <div className="post-card-cover-wrapper">
        <Image
          src={"https:" + coverImage.fields.file.url}
          alt={coverImage.fields.description}
          width={396}
          height={240}
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
          {moment(createdAt).format("MMMM DD, YYYY")}
        </p>

        <p className="post-card-read-text">
          Read Article
          <Arrow height={24} width={24} />
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
