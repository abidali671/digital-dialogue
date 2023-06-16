import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContentContainer from "../ContentContainer";
import { ArrowLeft, ArrowRight } from "@/assets/icon";
import { IPostData } from "@/types";

import moment from "moment";

interface IProps {
  posts: IPostData[];
}

const Hero = ({ posts }: IProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const post = useMemo(() => posts[currentSlide], [currentSlide, posts]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(currentSlide === 0 ? posts.length - 1 : currentSlide - 1);
  }, [currentSlide, posts.length]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === posts.length - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, posts.length]);

  return (
    <div className="flex relative justify-center md:h-[calc(100vh_-_64px)] h-[70vh] overflow-hidden">
      <div className="w-[40%] max-md:hidden relative bg-neutral-100"></div>
      <div className="md:w-[60%]">
        <Image
          src={"https:" + post.fields.coverImage.fields.file.url}
          alt={post.fields.coverImage.fields.title}
          width={post.fields.coverImage.fields.file.details.image.width}
          height={post.fields.coverImage.fields.file.details.image.height}
          className="w-[100%] h-[100%] object-cover"
        />
      </div>
      <ContentContainer className="!absolute top-0 lg:top-20 bottom-0 left-[50%]  md:left-[55%] translate-x-[-50%]">
        <div className="absolute left-0 top-[50%] translate-y-[-50%] flex flex-col gap-10 max-w-[650px] max-md:px-4">
          <div className="bg-white z-0 shadow-none md:shadow-lg w-[100%] md:text-left text-center md:items-start items-center p-4 md-p-6 flex flex-col gap-2">
            <span className="flex items-center gap-1 ">
              <hr className="w-10 h-[2px] border-0 rounded bg-orange-700" />
              <p>{post?.fields.category.fields.label}</p>
            </span>
            <h2 className="text-2xl md:text-5xl font-bold line-clamp-2">
              {post?.fields.title}
            </h2>
            <p className="text-gray-500 flex items-center gap-2 text-xs lg:text-base">
              {moment(post.sys.createdAt).format("MMMM DD, YYYY")}
            </p>
            <p className="text-gray-500 text-xs lg:text-base line-clamp-3">
              {post.fields.excerpt}
            </p>
            <Link
              href={{
                pathname: "/blogs/[category]/[blog_detail]",
                query: {
                  category: post.fields.category.fields.slug,
                  blog_detail: post.fields.slug,
                },
              }}
              className="p-2 bg-orange-500 rounded-sm w-[100px] lg:w-[130px] text-white text-center"
            >
              Read More
            </Link>
          </div>
          <SliderIndicator
            onPrevSlide={handlePrevSlide}
            onNextSlide={handleNextSlide}
            posts={posts}
            id={post.sys.id}
          />
        </div>
      </ContentContainer>
    </div>
  );
};

interface SliderIndicatorPropsT {
  onPrevSlide: React.MouseEventHandler<HTMLDivElement>;
  onNextSlide: React.MouseEventHandler<HTMLDivElement>;
  posts: IPostData[];
  id: string;
}
const SliderIndicator = ({
  onPrevSlide,
  onNextSlide,
  posts,
  id,
}: SliderIndicatorPropsT) => (
  <div className="flex items-center gap-3">
    <div
      onClick={onPrevSlide}
      className="p-2 rounded-full text-center cursor-pointer bg-white shadow-md text-black"
    >
      <ArrowLeft />
    </div>
    <div className="flex gap-1">
      {posts.map((post) => (
        <span
          key={post.sys.id}
          className={`h-2 w-2 rounded-full ${
            post.sys.id == id ? "bg-orange-200" : " bg-orange-400"
          }`}
        ></span>
      ))}
    </div>
    <div
      onClick={onNextSlide}
      className="p-2 rounded-full text-center cursor-pointer bg-white shadow-md text-black"
    >
      <ArrowRight />
    </div>
  </div>
);

export default Hero;
