import React from "react";
import { IPostData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

interface CardPropsT {
  data: IPostData[];
}
const TopPosts = ({ data }: CardPropsT) => {
  return (
    <div className="gap-4 flex flex-col">
      <h2 className="text-xl font-bold">Top Posts</h2>
      {data.map((item: IPostData) => {
        const { coverImage, title, slug, category } = item.fields;
        const { createdAt } = item.sys;
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
                width={96}
                height={80}
                className="w-24 h-20 rounded-md object-cover"
              />

              <div className="flex flex-col">
                <h4 className="!text-sm line-clamp-2">{title}</h4>
                <p className="text-xs text-gray-500">
                  {moment(createdAt).format("MMM DD, YYYY")}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TopPosts;
