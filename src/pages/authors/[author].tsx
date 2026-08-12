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
    <div className="relative pb-16">
      <div className="w-full border-b border-line bg-white">
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-12">
          <div className="flex h-12 w-full max-w-xl items-center gap-3 rounded-lg border border-line bg-mist px-4">
            <SearchIcon className="h-5 w-5 text-mute" />
            <input
              type="text"
              className="w-full border-none bg-transparent text-ink outline-0 placeholder:text-mute-soft"
              placeholder="Search posts"
              onChange={handleSearchText}
              value={searchText}
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
