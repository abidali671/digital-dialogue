import React, { useMemo, useState } from "react";
import { ContentContainer, PostCard, Title } from "@/components";
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
    <div className="relative pb-16">
      <div className="w-full border-b border-line bg-white">
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-12">
          <div className="flex h-12 w-full max-w-xl items-center gap-3 rounded-lg border border-line bg-mist px-4">
            <SearchIcon className="h-5 w-5 text-mute" />
            <input
              type="text"
              className="w-full border-none bg-transparent text-ink outline-0 placeholder:text-mute-soft"
              placeholder="Search posts"
              value={searchText}
              onChange={handleSearchText}
            />
          </div>
        </div>
      </div>
      <ContentContainer className="relative flex flex-col justify-center pt-10">
        <Title>Blogs</Title>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 lg:grid-cols-3">
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

    return {
      props: {
        params,
        posts: response.items,
        categories: categories_response.items,
        title: `${category_response.items[0].fields.label} | Category`,
        description: category_response.items[0].fields.description,
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
