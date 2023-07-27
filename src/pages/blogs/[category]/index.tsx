import React, { useMemo, useState } from "react";
import { ContentContainer, PostCard } from "@/components";
import { SearchIcon } from "@/assets/icon";
import contentful_client from "@/lib/contentful/client";
import { ICategoryData, IPostData } from "@/types";
import config from "@/lib/config";

interface ICategoryProps {
  posts: IPostData[];
  params: Record<string, string>;
}

const Category = ({ posts }: ICategoryProps) => {
  const [searchText, setSearchText] = useState<string>("");

  const filteredPosts = useMemo(() => {
    const filter_list = posts?.filter(
      (post) =>
        post.fields.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.fields.excerpt.toLowerCase().includes(searchText.toLowerCase())
    );

    return filter_list;
  }, [posts, searchText]);

  const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

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
                value={searchText}
                onChange={handleSearchText}
              />
            </div>
          </div>
        </div>
      </div>
      <ContentContainer className="relative flex justify-center flex-col p-0">
        <div className="md:col-span-7 col-span-10 gap-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(3,minmax(300px,1fr))]">
          {filteredPosts?.map((post: IPostData) => (
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

    const [category_response, categories_response] = await Promise.all([
      contentful_client.getEntries({
        content_type: "category",
        "fields.slug": category,
      }),
      contentful_client.getEntries({ content_type: "category" }),
    ]);

    const response = await contentful_client.getEntries({
      content_type: "post",
      links_to_entry: category_response.items[0].sys.id,
    });

    if (!response?.items?.length || !category_response?.items?.length) {
      throw "Error";
    }
    console.log("category_response.items[0]", category_response.items[0]);
    return {
      props: {
        params,
        posts: response.items,
        categories: categories_response.items,
        title: `${category_response.items[0].fields.label} | Category | ${config.SITE_NAME}`,
      },
    };
  } catch (error) {
    return { redirect: { destination: "/", permanent: false } };
  }
};

export const getStaticPaths = async () => {
  const response = await contentful_client.getEntries({
    content_type: "category",
  });

  const paths = response.items.map((item: ICategoryData) => ({
    params: {
      category: item.fields.slug,
    },
  }));

  return { paths, fallback: true };
};

export default Category;
