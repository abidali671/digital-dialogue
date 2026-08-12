import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { Arrow } from "@/assets/icon";
import { IPostData } from "@/types";

interface CardPropsT {
  data: IPostData;
  priority?: boolean;
}

const PostCard = ({ data, priority = false }: CardPropsT) => {
  const { category, coverImage, title, excerpt, slug } = data.fields;
  const { createdAt } = data.sys;

  return (
    <Link
      href={`/blogs/${category.fields.slug}/${slug}`}
      className="post-card-root"
    >
      <div className="post-card-cover-wrapper">
        <Image
          src={"https:" + coverImage.fields.file.url}
          alt={coverImage.fields.description || title}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 400px, (min-width: 640px) 45vw, 100vw"
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
          {moment.utc(createdAt).format("MMMM DD, YYYY")}
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
