import React from "react";
import PostCard from "../PostCard";
import Category from "../Category";
import ContentContainer from "../ContentContainer";
import Title from "../Title";
import { ICategoryData, ITagData, IPostData } from "@/types";
import Link from "next/link";
import { ArrowRight } from "@/assets/icon";
import { BannerAd160x300, BannerAd160x600 } from "../../components";

interface PropsT {
  posts: IPostData[];
  categories: ICategoryData[];
  tags: ITagData[];
}

const AllPosts = ({ posts, categories }: PropsT) => {
  return (
    <div className="bg-neutral-100">
      <ContentContainer>
        <Title>All Post</Title>
        <div className="md:grid-cols-[1fr_240px] grid pt-10 gap-6">
          <div>
            <div className="gap-6 grid md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post: IPostData) => (
                <PostCard key={post.fields.slug} data={post} />
              ))}
            </div>

            {posts.length > 0 ? (
              ""
            ) : (
              <Link
                href="/blogs"
                className="text-base font-medium text-center flex items-center justify-center py-4"
              >
                Show More
                <ArrowRight
                  className="-mr-[10px] ml-1"
                  height={16}
                  width={16}
                />
                <ArrowRight height={16} width={16} />
              </Link>
            )}
          </div>
          <div className="hidden md:flex gap-2 flex-col">
            <div className="gap-2 flex flex-col sm:px-0 px-4 sticky top-20">
              <h2 className="text-xl font-bold">Featured Category</h2>
              {categories.map((data: ICategoryData, ind) => (
                <Category key={ind} data={data} />
              ))}
              <BannerAd160x300 />
              <BannerAd160x600 />
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default AllPosts;
