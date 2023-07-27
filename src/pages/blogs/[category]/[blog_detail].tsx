import { ContentContainer, LoadingSpinner, ShareButtons } from "@/components";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React from "react";
import contentful_client from "@/lib/contentful/client";
import { useRouter } from "next/router";
import { IPostData } from "@/types";
import Image from "next/image";
import moment from "moment";
import config from "@/lib/config";

interface IBlogDetailProps {
  post: IPostData;
}

const BlogDetail = ({ post }: IBlogDetailProps) => {
  const router = useRouter();

  if (router.isFallback) return <LoadingSpinner variant="full" />;

  const { coverImage, category, title, author, content } = post.fields;
  const { createdAt } = post.sys;

  return (
    <React.Fragment>
      <div className="h-[40vh] sm:h-[70vh] w-full bg-neutral-300 relative">
        <Image
          src={"https:" + coverImage.fields.file.url}
          alt={coverImage.fields.title}
          height={coverImage.fields.file.details.image.height}
          width={coverImage.fields.file.details.image.width}
          className="object-cover h-full w-full"
        />
      </div>
      <ContentContainer>
        <div className="p-5 gap-3 flex w-full sm:w-11/12 md:w-8/12 flex-col text-left items-start border border-gray-200 shadow-gray-200 shadow-sm border-t-0 bg-white relative bottom-32  mx-auto ">
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
        <main className="mx-auto w-11/12 md:w-8/12 -mt-16">
          <article className="flex flex-col gap-4">
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
        </main>
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

    if (!response?.items?.length || !category_response?.items?.length) {
      throw "Error";
    }

    const post: IPostData = response.items[0];

    return {
      props: {
        params,
        post,
        categories: categories_response.items,
        title: `${post.fields.title} | Blog`,
        description: post.fields.excerpt,
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
