import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { IPostData } from "@/types";

interface CardPropsT {
  data: IPostData;
}

const PostCard = ({ data }: CardPropsT) => {
  const { category, coverImage, title, excerpt, slug, author } = data.fields;
  const { createdAt } = data.sys;
  const { url } = author.fields.picture.fields.file;

  return (
    <div className="max-w-sm flex flex-col flex-wrap overflow-hidden bg-white border border-gray-100  rounded-3xl  shadow ">
      <Image
        src={"https:" + coverImage.fields.file.url}
        alt={coverImage.fields.description}
        width={396}
        height={240}
        className=" object-cover h-[250px]"
      />

      <div className="p-5">
        <div className="flex flex-wrap  gap-1 mb-2 items-center">
          <Link
            href={{
              pathname: "/blogs/[category]/[blog_detail]",
              query: { category: category.fields.slug, blog_detail: slug },
            }}
            className="flex  items-center gap-2"
          >
            <Image
              src={"https:" + url}
              alt={coverImage.fields.description}
              width={40}
              height={40}
              className="rounded-full h-7 w-7 object-cover"
            />
            <p className="text-sm text-neutral-700">{author.fields.name}</p>
          </Link>
          <span className="text-neutral-500   mx-[6px] font-medium">·</span>
          <p className="text-sm text-neutral-400">
            {moment(createdAt).format("MMM DD, YYYY")}
          </p>
        </div>
        <Link
          href={{
            pathname: "/blogs/[category]/[blog_detail]",
            query: { category: category.fields.slug, blog_detail: slug },
          }}
        >
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900  ">
            {title}
          </h5>

          <p className="mb-3 font-normal  text-sm text-gray-700 dark:text-gray-400">
            {excerpt}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
