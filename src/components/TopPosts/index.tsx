import React from "react";
import { IPostData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

interface CardPropsT {
  data: IPostData;
}
const TopPosts = ({ data }: CardPropsT) => {
  const { coverImage, title, slug, category } = data.fields;
  const { createdAt } = data.sys;

  return (
    <Link
      href={{
        pathname: "/blogs/[category]/[blog_detail]",
        query: { category: category.fields.slug, blog_detail: slug },
      }}
    >
      <div className="flex gap-5 items-start  w-full">
        <Image
          src={"https:" + coverImage.fields.file.url}
          alt={coverImage.fields.description}
          width={396}
          className="w-24 h-20 rounded-md"
          height={240}
        />

        <div className="flex flex-col">
          <h3 className="text-base ">{title}</h3>
          <div className="flex  gap-2 ">
            {moment(createdAt).format("MMM DD, YYYY")}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopPosts;
