import {
  Category,
  ContentContainer,
  LoadingSpinner,
  PostCard,
  ShareButtons,
  Tag,
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

  const {
    coverImage,
    category,
    title,
    author,
    content,
    tags,
    excerpt,
    keywords,
  } = post.fields;
  const { createdAt, updatedAt } = post.sys;
  const formattedTags = tags?.map((tag) => tag.fields.label).join(", ");
  const blogKeywords = keywords ?? formattedTags;

  return (
    <React.Fragment>
      <ArticleJsonLd
        type="Blog"
        title={title}
        description={excerpt}
        authorName={author.fields.name}
        url={config.BASE_URL + router.asPath}
        keywords={keywords || formattedTags}
        datePublished={moment(createdAt).format("MMMM DD, YYYY")}
        dateModified={moment(updatedAt).format("MMMM DD, YYYY")}
        images={["https:" + coverImage.fields.file.url]}
      />
      <div className="relative h-[42vh] w-full bg-ink sm:h-[58vh]">
        <Image
          src={"https:" + coverImage.fields.file.url}
          alt={coverImage.fields.description || title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mist via-mist/20 to-transparent" />
      </div>
      <ContentContainer className="relative z-10 -mt-28 md:px-16">
        <header className="mb-10 flex flex-col gap-4 border-b border-line bg-white px-5 py-8 md:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-accent">
            {category.fields.label}
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {title}
          </h1>
          <div className="flex w-full flex-wrap items-center justify-between gap-y-3">
            <div className="flex items-center gap-3 pt-1">
              <span className="h-10 w-10 overflow-hidden rounded-full bg-mist">
                <Image
                  alt={author.fields.name}
                  src={"https:" + author.fields.picture.fields.file.url}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </span>
              <p className="text-base font-semibold text-ink">
                {author.fields.name}
              </p>
              <span className="h-1 w-1 rounded-full bg-mute-soft" />
              <p className="font-mono text-xs text-mute md:text-sm">
                {moment(createdAt).format("MMMM DD, YYYY")}
              </p>
            </div>
            <ShareButtons url={config.BASE_URL + router.asPath} />
          </div>
        </header>
        <main className="mx-auto grid w-full gap-10 md:grid-cols-[1fr_220px]">
          <div className="md:pr-6">
            <article className="article-wrapper">
              {documentToReactComponents(content)}
            </article>
            <div className="mt-10 flex flex-wrap gap-2">
              {blogKeywords.split(",").map((keyword, index) => (
                <Tag key={index}>{keyword}</Tag>
              ))}
            </div>
            <div className="py-10">
              <hr className="border-line" />
              <div className="flex items-center gap-3 py-4">
                <p className="text-sm font-semibold text-ink">Share</p>
                <ShareButtons url={config.BASE_URL + router.asPath} />
              </div>
              <hr className="border-line" />
            </div>
          </div>
          <aside className="hidden md:block">
            <div className="sticky top-24 flex flex-col gap-3">
              <h2 className="font-display text-lg font-bold text-ink">
                Categories
              </h2>
              <div className="flex flex-col gap-1 border-t border-line pt-2">
                {categories.map((data: ICategoryData) => (
                  <Category key={data.fields.slug} data={data} />
                ))}
              </div>
            </div>
          </aside>
        </main>
        <section className="pb-16 pt-4">
          <Title as="h2">Suggested posts</Title>
          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {suggestedPost.map((item: IPostData) => (
              <PostCard key={item.fields.slug} data={item} />
            ))}
          </div>
        </section>
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
