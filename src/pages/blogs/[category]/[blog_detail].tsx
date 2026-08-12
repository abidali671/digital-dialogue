import {
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
import Link from "next/link";
import moment from "moment";
import config from "@/lib/config";
import { getReadingTime, shuffleArray } from "@/helper";
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
  const shareUrl = config.BASE_URL + router.asPath;
  const readingTime = getReadingTime(content);

  return (
    <React.Fragment>
      <ArticleJsonLd
        type="Blog"
        title={title}
        description={excerpt}
        authorName={author.fields.name}
        url={shareUrl}
        keywords={keywords || formattedTags}
        datePublished={moment(createdAt).format("MMMM DD, YYYY")}
        dateModified={moment(updatedAt).format("MMMM DD, YYYY")}
        images={["https:" + coverImage.fields.file.url]}
      />

      <header className="border-b border-line bg-white">
        <ContentContainer className="py-12 md:py-16">
          <div className="reading-column">
            <nav className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-mute">
              <Link href="/blogs" className="hover:text-accent">
                Blogs
              </Link>
              <span className="text-mute-soft">/</span>
              <Link
                href={{
                  pathname: "/blogs/[category]",
                  query: { category: category.fields.slug },
                }}
                className="text-accent hover:text-accent-hover"
              >
                {category.fields.label}
              </Link>
            </nav>

            <h1 className="mb-5 font-display text-3xl font-bold leading-[1.15] tracking-tight text-ink md:text-5xl">
              {title}
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-mute">
              {excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-mist">
                  <Image
                    alt={author.fields.name}
                    src={"https:" + author.fields.picture.fields.file.url}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                </span>
                <div>
                  <Link
                    href={{
                      pathname: "/authors/[author]",
                      query: { author: author.fields.slug },
                    }}
                    className="block text-base font-semibold text-ink hover:text-accent"
                  >
                    {author.fields.name}
                  </Link>
                  <p className="font-mono text-xs text-mute-soft">
                    {moment(createdAt).format("MMMM DD, YYYY")} ·{" "}
                    {readingTime} min read
                  </p>
                </div>
              </div>
              <ShareButtons url={shareUrl} />
            </div>
          </div>
        </ContentContainer>
      </header>

      <ContentContainer className="pt-10">
        <figure className="reading-column">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-line bg-mist-soft">
            <Image
              src={"https:" + coverImage.fields.file.url}
              alt={coverImage.fields.description || title}
              fill
              priority
              className="object-cover"
            />
          </div>
          {coverImage.fields.description && (
            <figcaption className="mt-3 text-center font-mono text-xs text-mute-soft">
              {coverImage.fields.description}
            </figcaption>
          )}
        </figure>
      </ContentContainer>

      <ContentContainer className="pb-4 pt-10">
        <div className="reading-column">
          <article className="article-wrapper">
            {documentToReactComponents(content)}
          </article>

          {blogKeywords && (
            <div className="mt-12 flex flex-wrap gap-2">
              {blogKeywords.split(",").map((keyword, index) => (
                <Tag key={index}>{keyword}</Tag>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4 border-y border-line py-5">
            <p className="text-sm font-semibold text-ink">Share this article</p>
            <ShareButtons url={shareUrl} />
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-xl border border-line bg-white p-6 sm:flex-row">
            <span className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-mist">
              <Image
                alt={author.fields.name}
                src={"https:" + author.fields.picture.fields.file.url}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-accent">
                {author.fields.role}
              </p>
              <Link
                href={{
                  pathname: "/authors/[author]",
                  query: { author: author.fields.slug },
                }}
                className="font-display text-xl font-bold text-ink hover:text-accent"
              >
                {author.fields.name}
              </Link>
              <p className="mt-2 text-base text-mute">{author.fields.about}</p>
            </div>
          </div>
        </div>
      </ContentContainer>

      <section className="mt-14 border-t border-line bg-white py-14 md:py-16">
        <ContentContainer>
          <Title as="h2">Keep reading</Title>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
            {suggestedPost.map((item: IPostData) => (
              <PostCard key={item.fields.slug} data={item} />
            ))}
          </div>

          <div className="mt-14 border-t border-line pt-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-mute">
              Browse categories
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((data: ICategoryData) => (
                <Link
                  key={data.fields.slug}
                  href={{
                    pathname: "/blogs/[category]",
                    query: { category: data.fields.slug },
                  }}
                  className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {data.fields.label}
                </Link>
              ))}
            </div>
          </div>
        </ContentContainer>
      </section>
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
