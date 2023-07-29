import React, { useMemo, useState } from "react";
import { ContentContainer, LoadMoreButton, PostCard } from "@/components";
import { SearchIcon } from "@/assets/icon";
import { ICategoryData, IPostData, ITagData } from "@/types";
import contentful_client from "@/lib/contentful/client";
import config from "@/lib/config";

interface PropsT {
  posts: IPostData[];
  categories: ICategoryData[];
  tags: ITagData[];
  totalPosts: number;
}

const Blogs = ({ posts, totalPosts }: PropsT) => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPagePosts, setCurrentPagePosts] = useState<IPostData[]>(posts);
  const [loading, setLoading] = useState<boolean>(false);

  const filteredPosts = useMemo(() => {
    const filter_list = currentPagePosts.filter(
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
      const response = await fetch(`/api/blogs?page=2`);
      const { data } = await response.json();
      setCurrentPagePosts((prev) => [...prev, ...data]);
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
        <div className="md:col-span-7 col-span-10 gap-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(3,minmax(300px,1fr))]">
          {filteredPosts.map((post: IPostData) => (
            <PostCard key={post.fields.slug} data={post} />
          ))}
        </div>
        <LoadMoreButton
          onClick={handleLoadMore}
          isLoading={loading}
          isVisible={currentPagePosts.length < totalPosts}
        />
      </ContentContainer>
    </div>
  );
};

export const getStaticProps = async (context: any) => {
  const responses = await Promise.all([
    contentful_client.getEntries({
      content_type: "post",
      limit: config.BLOGS_PER_PAGE,
    }),
    contentful_client.getEntries({ content_type: "category" }),
  ]);
  return {
    props: {
      posts: responses[0].items,
      categories: responses[1].items,
      totalPosts: responses[0].total,
      title: `Blogs`,
    },
  };
};

export default Blogs;
