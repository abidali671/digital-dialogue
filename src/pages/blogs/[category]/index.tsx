import React from "react";
import { ContentContainer, PostCard } from "@/components";
import { SearchIcon } from "@/assets/icon";
import contentful_client from "@/lib/contentfull/client";
import { IPostData } from "@/types";

interface ICategoryProps {
  posts: IPostData[];
  params: Record<string, string>;
}

const Category = ({ posts, params }: ICategoryProps) => {
  return (
    <div className="relative">
      <div className="w-full bg-neutral-200 ">
        <div className="flex flex-col h-full items-center  justify-center py-10 gap-4 px-10 ">
          <div className="flex gap-2 justify-center items-center w-full sm:flex-row flex-col ">
            <div className="flex gap-2 h-12 w-full sm:w-6/12 bg-white items-center shadow-md px-3">
              <SearchIcon className="w-6 h-6" />
              <input
                type="text"
                className=" border-none outline-0 text-black bg-transparent w-full"
                placeholder="Search Blogs"
              />
            </div>
            <button className="bg-orange-500 h-12 p-3 text-white w-28">
              Search
            </button>
          </div>
        </div>
      </div>
      <ContentContainer className="relative flex justify-center flex-col p-0">
        <div className="md:col-span-7 col-span-10 gap-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(3,minmax(300px,1fr))]">
          {posts?.map((post: IPostData) => (
            <PostCard key={post.fields.slug} data={post} />
          ))}
        </div>
      </ContentContainer>
    </div>
  );
};

export const getStaticProps = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  try {
    const { category } = params;

    const category_response = await contentful_client.getEntries({
      content_type: "category",
      "fields.slug": category,
    });

    const response = await contentful_client.getEntries({
      content_type: "post",
      links_to_entry: category_response.items[0].sys.id,
    });

    if (!response?.items?.length || !category_response?.items?.length) {
      throw "Error";
    }

    return { props: { params, posts: response.items } };
  } catch (error) {
    return { redirect: { destination: "/", permanent: false } };
  }
};

export const getStaticPaths = async () => {
  const response = await contentful_client.getEntries({ content_type: "post" });
  const paths = response.items.map((item: any) => ({
    params: {
      category: item.fields.category.fields.slug,
    },
  }));

  return { paths, fallback: true };
};

export default Category;
