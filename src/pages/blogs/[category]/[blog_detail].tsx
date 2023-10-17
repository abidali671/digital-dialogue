import {
  Category,
  ContentContainer,
  LoadingSpinner,
  PostCard,
  ShareButtons,
  Title,
} from "@/components";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React from "react";
import contentful_client from "@/lib/contentful/client";
import { useRouter } from "next/router";
import { ICategoryData, IPostData } from "@/types";
import Image from "next/image";
import moment from "moment";
import config from "@/lib/config";
import { shuffleArray } from "@/helper";
import { ArticleJsonLd } from "next-seo";

interface IBlogDetailProps {
  post: IPostData;
  suggestedPost: IPostData[];
  categories: ICategoryData[];
}

const BlogDetail = ({ post, categories, suggestedPost }: IBlogDetailProps) => {
  const router = useRouter();
  if (router.isFallback) return <LoadingSpinner variant="full" />;

  const { coverImage, category, title, author, content, tags, excerpt } =
    post.fields;
  const { createdAt, updatedAt } = post.sys;
  const keywords = tags?.map((tag) => tag.fields.label).join(", ");

  return (
    <React.Fragment>
      <ArticleJsonLd
        type="Blog"
        title={title}
        description={excerpt}
        authorName={author.fields.name}
        url={config.BASE_URL + router.asPath}
        keywords={keywords}
        datePublished={moment(createdAt).format("MMMM DD, YYYY")}
        dateModified={moment(updatedAt).format("MMMM DD, YYYY")}
        images={["https:" + coverImage.fields.file.url]}
      />
      <div className="h-[40vh] sm:h-[70vh] w-full bg-neutral-300 relative">
        <Image
          src={"https:" + coverImage.fields.file.url}
          alt={coverImage.fields.description}
          height={coverImage.fields.file.details.image.height}
          width={coverImage.fields.file.details.image.width}
          className="object-cover h-full w-full"
        />
      </div>
      <ContentContainer className="md:px-20">
        <div className="p-5 gap-3 flex md:w-full sm:w-full flex-col text-left items-start border border-gray-200 shadow-gray-200 shadow-sm border-t-0 bg-white relative bottom-32  mx-auto ">
          <span className="flex items-center gap-1">
            <hr className="w-10 h-[2px] border-0 rounded bg-orange-700" />
            <p>{category.fields.label}</p>
          </span>
          <h1 className="md:text-5xl text-4xl font-bold tracking-tight text-gray-900 font-PT">
            {title}
          </h1>
          <div className="flex justify-between w-full flex-wrap gap-y-3">
            <div className="flex items-center gap-3 pt-3">
              <div className="flex gap-2 items-center">
                <span className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
                  <Image
                    alt={author.fields.name}
                    src={"http:" + author.fields.picture.fields.file.url}
                    width={40}
                    height={40}
                  />
                </span>
                <p className="font-medium text-lg">{author.fields.name}</p>
              </div>
              <span className="flex h-[5px] w-[5px] bg-gray-500 rounded-lg"></span>
              <p className="text-gray-500 flex items-center gap-2 text-xs lg:text-base">
                {moment(createdAt).format("MMMM DD, YYYY")}
              </p>
            </div>
            <ShareButtons url={config.BASE_URL + router.asPath} />
          </div>
        </div>
        <main className="mx-auto w-full grid grid-cols-10 gap-5 -mt-16">
          <div className="col-span-10 md:col-span-7 md:pr-10">
            <article className="article-wrapper ">
              {documentToReactComponents(content)}
            </article>
            <div className="py-10">
              <hr />
              <div className="flex items-center gap-3 py-4">
                <p>Share the post:</p>
                <ShareButtons url={config.BASE_URL + router.asPath} />
              </div>
              <hr />
            </div>
          </div>
          <div className="md:col-span-3 max-md:hidden col-span-10 flex-col">
            <div className="gap-2 flex flex-col sm:px-0 px-4 sticky top-20">
              <h2 className="text-xl font-bold">Featured Category</h2>
              {categories.map((data: ICategoryData, ind: number) => (
                <Category key={ind} data={data} />
              ))}
            </div>
          </div>
        </main>
        <div>
          <Title>Suggested Posts </Title>
          <div className="overflow-auto w-full mt-6">
            <div className="grid gap-6 min-w-[950px] grid-cols-3">
              {suggestedPost.map((item: IPostData) => (
                <PostCard key={item.fields.slug} data={item} />
              ))}
            </div>
          </div>
        </div>
      </ContentContainer>
    </React.Fragment>
  );
};

export const getStaticProps = async ({ params }: any) => {
  try {
    const { category, blog_detail } = params;

    const [category_response, categories_response] = await Promise.all([
      contentful_client.getEntries({
        content_type: "category",
        "fields.slug": category,
      }),
      contentful_client.getEntries({ content_type: "category" }),
    ]);

    const response = await contentful_client.getEntries({
      content_type: "post",
      "fields.slug": blog_detail,
      links_to_entry: category_response.items[0].sys.id,
    });

    const suggested_post_response = await contentful_client.getEntries({
      content_type: "post",
      limit: 20,
      "sys.id[ne]": response.items[0].sys.id,
    });

    if (!response?.items?.length || !category_response?.items?.length) {
      throw "Error";
    }

    const post: IPostData = response.items[0];
    const suggestedPost = shuffleArray(suggested_post_response.items).slice(
      0,
      3
    );

    return {
      props: {
        params,
        post,
        suggestedPost,
        categories: categories_response.items,
        title: `${post.fields.title} | Blog`,
        description: post.fields.excerpt,
        url: `${config.BASE_URL}/blogs/${category}/${blog_detail}`,
      },
    };
  } catch (error) {
    return { redirect: { destination: "/", permanent: false } };
  }
};

export const getStaticPaths = async () => {
  const response = await contentful_client.getEntries({ content_type: "post" });
  const paths = response.items.map((item: any) => ({
    params: {
      category: item.fields.category.fields.slug,
      blog_detail: item.fields.slug,
    },
  }));

  return { paths, fallback: true };
};

export default BlogDetail;
