import React, { useMemo, useState } from "react";
import {
  ContentContainer,
  LoadMoreButton,
  PostCard,
  Title,
} from "@/components";
import { SearchIcon } from "@/assets/icon";
import contentful_client from "@/lib/contentful/client";
import { IAuthor, IPostData } from "@/types";
import API from "@/lib/api";

interface ICategoryProps {
  posts: IPostData[];
  totalPosts: number;
  params: Record<string, string>;
}

const Author = ({ posts, totalPosts }: ICategoryProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [pageNo, setPageNo] = useState<number>(1);
  const [currentPagePosts, setCurrentPagePosts] = useState<IPostData[]>(posts);
  const [loading, setLoading] = useState<boolean>(false);

  const filteredPosts = useMemo(() => {
    const filter_list = currentPagePosts?.filter(
      (post) =>
        post.fields.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.fields.excerpt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.fields.category.fields.label
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );

    return filter_list;
  }, [currentPagePosts, searchText]);

  const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/blogs?page=${pageNo + 1}`);
      setCurrentPagePosts((prev) => [...prev, ...data.items]);
      setPageNo(pageNo + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
                onChange={handleSearchText}
                value={searchText}
              />
            </div>
          </div>
        </div>
      </div>
      <ContentContainer className="relative flex justify-center flex-col p-0">
        <Title>Blogs</Title>
        <div className="mt-6 md:col-span-7 col-span-10 gap-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(3,minmax(300px,1fr))]">
          {filteredPosts?.map((post: IPostData) => (
            <PostCard key={post.fields.slug} data={post} />
          ))}
        </div>
        <LoadMoreButton
          onClick={handleLoadMore}
          isLoading={loading}
          isVisible={currentPagePosts?.length < totalPosts}
        />
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
    const { author } = params;

    const [author_response, categories_response] = await Promise.all([
      contentful_client.getEntries({
        content_type: "author",
        "fields.slug": author,
      }),
      contentful_client.getEntries({
        content_type: "category",
      }),
    ]);

    const { data } = await API.get(`/blogs`);
    const { items: posts, total: totalPosts } = data;

    if (!posts?.length || !author_response?.items?.length) {
      throw "Error";
    }

    return {
      props: {
        params,
        posts,
        totalPosts,
        categories: categories_response.items,
        title: `${author_response.items[0].fields.name} | Author`,
        description: author_response.items[0].fields.about,
      },
    };
  } catch (error) {
    console.error(error);
    return { redirect: { destination: "/", permanent: true } };
  }
};

export const getStaticPaths = async () => {
  const response = await contentful_client.getEntries({
    content_type: "author",
  });

  const paths = response.items.map((item: IAuthor) => ({
    params: {
      author: item.fields.slug,
    },
  }));

  return { paths, fallback: true };
};

export default Author;
