import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ContentContainer from "@/components/ContentContainer";
import PostCard from "@/components/PostCard";
import PostFaqs from "@/components/PostFaqs";
import ShareButtons from "@/components/ShareButtons";
import Tag from "@/components/Tag";
import Title from "@/components/Title";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createRichTextOptions } from "@/lib/richText";
import contentful_client, { REVALIDATE_DETAIL } from "@/lib/contentful/client";
import { IFaq, IPostData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import config from "@/lib/config";
import {
  formatLongDate,
  getPublishedDate,
  getReadingTime,
  toIsoTimestamp,
  wasUpdatedAfterPublish,
} from "@/helper";
import { pickRelatedPosts, getPostTags, toShareHashtags } from "@/lib/keywords";
import { isNextNotFound } from "@/lib/next-errors";
import { DEFAULT_OG_IMAGE, pageTitle, resolvePageTitle } from "@/lib/metadata";
import {
  articlePublisher,
  breadcrumbSchema,
  faqPageSchema,
  JsonLdScript,
} from "@/lib/schema";
import { extractToc, shouldShowToc } from "@/lib/toc";
import TableOfContents from "@/components/TableOfContents";
import { ArticleJsonLd } from "next-seo";
import { getSiteAuthor } from "@/constants/authors";
import { HUB_TOOLS } from "@/lib/toolsHub";
import clsx from "clsx";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ category: string; blog_detail: string }>;
};

function toMetaDescription(value: string | undefined, fallback: string) {
  const description = (value || fallback).replace(/\s+/g, " ").trim();
  return description.length > 160
    ? `${description.slice(0, 157).trimEnd()}...`
    : description;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const category_response = await contentful_client.getEntries(
      {
        content_type: "category",
        "fields.slug": params.category,
      },
      { revalidate: REVALIDATE_DETAIL },
    );
    const category = category_response.items[0];
    if (!category) notFound();

    const response = await contentful_client.getEntries(
      {
        content_type: "post",
        "fields.slug": params.blog_detail,
        links_to_entry: category.sys.id,
      },
      { revalidate: REVALIDATE_DETAIL },
    );
    const post = response.items[0] as unknown as IPostData | undefined;
    if (!post) notFound();

    const url = `${config.BASE_URL}/blogs/${params.category}/${params.blog_detail}`;
    const title = String(post.fields.title);
    const resolvedTitle = resolvePageTitle(title);
    const description = toMetaDescription(
      post.fields.excerpt,
      `Read ${title} on Digital Dialogue.`,
    );
    const imagePath = post.fields.coverImage?.fields?.file?.url;
    const imageUrl = imagePath
      ? imagePath.startsWith("//")
        ? `https:${imagePath}`
        : imagePath
      : undefined;
    const images = imageUrl ? [imageUrl] : [DEFAULT_OG_IMAGE];

    return {
      title: pageTitle(title),
      description,
      keywords: post.fields.keywords,
      alternates: { canonical: url },
      openGraph: {
        title: resolvedTitle,
        description,
        url,
        type: "article",
        images,
      },
      twitter: {
        card: "summary_large_image",
        title: resolvedTitle,
        description,
        images,
      },
    };
  } catch (error) {
    if (isNextNotFound(error)) throw error;
    return {
      title: pageTitle("Digital Dialogue Article"),
      description: "Read practical articles and guides from Digital Dialogue.",
    };
  }
}

export default async function BlogDetailPage(props: PageProps) {
  const params = await props.params;
  try {
    const { category, blog_detail } = params;

    const category_response = await contentful_client.getEntries(
      {
        content_type: "category",
        "fields.slug": category,
      },
      { revalidate: REVALIDATE_DETAIL },
    );

    if (!category_response.items.length) notFound();
    const response = await contentful_client.getEntries(
      {
        content_type: "post",
        "fields.slug": blog_detail,
        links_to_entry: category_response.items[0].sys.id,
      },
      { revalidate: REVALIDATE_DETAIL },
    );

    if (!response.items.length) notFound();

    const post = response.items[0] as unknown as IPostData;

    const [sameCategoryResponse, relatedPoolResponse] = await Promise.all([
      contentful_client.getEntries(
        {
          content_type: "post",
          links_to_entry: category_response.items[0].sys.id,
          "sys.id[ne]": post.sys.id,
          limit: 10,
          order: "-sys.updatedAt",
        },
        { revalidate: REVALIDATE_DETAIL },
      ),
      contentful_client.getEntries(
        {
          content_type: "post",
          "sys.id[ne]": post.sys.id,
          limit: 40,
          order: "-sys.updatedAt",
        },
        { revalidate: REVALIDATE_DETAIL },
      ),
    ]);

    const recentPool = relatedPoolResponse.items as unknown as IPostData[];
    const latestPosts = recentPool.slice(0, 3);
    const latestIds = new Set(latestPosts.map((item) => item.sys.id));
    const relatedPosts = pickRelatedPosts(
      post,
      sameCategoryResponse.items as unknown as IPostData[],
      recentPool,
      6,
    )
      .filter((item) => !latestIds.has(item.sys.id))
      .slice(0, 3);
    const {
      coverImage,
      category: postCategory,
      title,
      content,
      excerpt,
      tags,
      keywords,
      faqs,
    } = post.fields;
    const author = getSiteAuthor();
    const { updatedAt } = post.sys;
    const publishedAt = getPublishedDate(post);
    const postTags = getPostTags(post);
    const faqList = (faqs ?? []).filter((faq): faq is IFaq =>
      Boolean(faq?.question?.trim() && faq?.answer?.trim()),
    );
    const shareUrl = `${config.BASE_URL}/blogs/${category}/${blog_detail}`;
    const shareHashtags = toShareHashtags(tags || keywords);
    const readingTime = getReadingTime(content);
    const tocHeadings = [
      ...extractToc(content),
      ...(faqList.length > 0
        ? [
            {
              id: "faqs-section",
              text: "Frequently asked questions",
              level: 2 as const,
            },
          ]
        : []),
    ];

    return (
      <>
        <ArticleJsonLd
          type="BlogPosting"
          title={title}
          description={excerpt}
          authorName={{
            name: author.name,
            url: `${config.BASE_URL}/authors/${author.slug}`,
          }}
          url={shareUrl}
          keywords={keywords}
          datePublished={toIsoTimestamp(publishedAt)}
          dateModified={toIsoTimestamp(updatedAt)}
          images={["https:" + coverImage.fields.file.url]}
          publisher={articlePublisher()}
          id={`${shareUrl}#article`}
          useAppDir
        />
        <JsonLdScript
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blogs" },
            {
              name: postCategory.fields.label,
              path: `/blogs/${postCategory.fields.slug}`,
            },
            {
              name: title,
              path: `/blogs/${category}/${blog_detail}`,
            },
          ])}
        />
        {faqList.length > 0 && (
          <JsonLdScript
            data={faqPageSchema(
              faqList.map((faq) => ({
                question: faq.question,
                answer: faq.answer,
              })),
            )}
          />
        )}

        <header className="border-b border-line bg-white">
          <ContentContainer className="py-12 md:py-16">
            <div className="reading-column">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blogs", href: "/blogs" },
                  {
                    label: postCategory.fields.label,
                    href: `/blogs/${postCategory.fields.slug}`,
                  },
                ]}
              />

              <h1 className="mb-5 font-display text-h1 text-ink">{title}</h1>
              <p className="mb-8 max-w-2xl text-lead text-mute">{excerpt}</p>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-caption text-mute-soft">
                  <time dateTime={toIsoTimestamp(publishedAt)}>
                    {formatLongDate(publishedAt)}
                  </time>
                  {wasUpdatedAfterPublish(publishedAt, updatedAt) && (
                    <>
                      <span aria-hidden>·</span>
                      <time dateTime={toIsoTimestamp(updatedAt)}>
                        Updated {formatLongDate(updatedAt)}
                      </time>
                    </>
                  )}
                  <span aria-hidden>·</span>
                  <span>{readingTime} min read</span>
                </p>
                <ShareButtons
                  url={shareUrl}
                  title={title}
                  excerpt={excerpt}
                  hashtags={shareHashtags}
                />
              </div>
            </div>
          </ContentContainer>
        </header>

        <ContentContainer className="pt-10">
          <figure className="reading-column">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-line bg-mist-soft">
              <Image
                src={"https:" + coverImage.fields.file.url}
                alt={title}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </ContentContainer>

        <ContentContainer className="pb-4 pt-10">
          <div className="reading-column">
            <article className="article-wrapper">
              {shouldShowToc(tocHeadings) && (
                <TableOfContents headings={tocHeadings} />
              )}
              {documentToReactComponents(content, createRichTextOptions())}
            </article>

            <PostFaqs faqs={faqList} />

            {postTags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2">
                {postTags.map((item) => (
                  <Tag key={item.slug} href={`/tags/${item.slug}`}>
                    {item.label}
                  </Tag>
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-4 border-y border-line py-5">
              <p className="flex h-8 items-center text-ui font-semibold text-ink">
                Share this article
              </p>
              <ShareButtons
                url={shareUrl}
                title={title}
                excerpt={excerpt}
                hashtags={shareHashtags}
              />
            </div>

            <div className="mt-10 flex flex-col gap-4 rounded-xl border border-line bg-white p-6 sm:flex-row">
              {author.picture ? (
                <span className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-mist">
                  <Image
                    alt={author.pictureAlt || author.name}
                    src={author.picture}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </span>
              ) : null}
              <div>
                <p className="font-mono text-caption uppercase tracking-[0.1em] text-accent">
                  {author.role}
                </p>
                <Link
                  href={`/authors/${author.slug}`}
                  className="font-display text-h4 text-ink hover:text-accent"
                >
                  {author.name}
                </Link>
                <p className="mt-2 text-copy text-mute">{author.about}</p>
              </div>
            </div>
          </div>
        </ContentContainer>

        {[
          { title: "Keep reading", posts: relatedPosts },
          { title: "Latest posts", posts: latestPosts },
        ]
          .filter((section) => section.posts.length > 0)
          .map((section, idx) => (
            <section
              key={section.title}
              className={clsx(
                "border-t border-line py-14 md:py-16",
                idx === 0 && "bg-white",
              )}
            >
              <ContentContainer>
                <Title as="h2">{section.title}</Title>
                <div className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
                  {section.posts.map((item) => (
                    <PostCard key={item.fields.slug} data={item} />
                  ))}
                </div>
              </ContentContainer>
            </section>
          ))}

        <section className="border-t border-line py-14 md:py-16 bg-white">
          <ContentContainer>
            <Title as="h2">Free Tools</Title>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
              {HUB_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="post-card-root"
                >
                  <div className="post-card-cover-wrapper">
                    <Image
                      src={tool.image}
                      alt={tool.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="post-card-content-wrapper">
                    <div className="post-card-label-wrapper">
                      <hr className="post-card-label-line" />
                      <p>Tool</p>
                    </div>
                    <p className="post-card-title">{tool.title}</p>
                    <p className="text-copy text-mute">{tool.copy}</p>
                    <p className="post-card-read-text">Open calculator</p>
                  </div>
                </Link>
              ))}
            </div>
          </ContentContainer>
        </section>
      </>
    );
  } catch (error) {
    if (isNextNotFound(error)) throw error;
    redirect("/");
  }
}
