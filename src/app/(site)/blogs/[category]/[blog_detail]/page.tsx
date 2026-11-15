import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ArticleToc from "@/components/article/ArticleToc";
import ShareRow from "@/components/article/ShareRow";
import Breadcrumb from "@/components/Breadcrumb";
import CoverImage from "@/components/CoverImage";
import FaqSection from "@/components/tools/FaqSection";
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
import { pickRelatedPosts, getPostTags } from "@/lib/keywords";
import { isNextNotFound } from "@/lib/next-errors";
import { DEFAULT_OG_IMAGE, pageTitle, resolvePageTitle } from "@/lib/metadata";
import {
  articlePublisher,
  breadcrumbSchema,
  faqPageSchema,
  JsonLdScript,
} from "@/lib/schema";
import { extractToc, shouldShowToc } from "@/lib/toc";
import { renderArticleBody } from "@/lib/articleBody";
import { contentfulImageUrl } from "@/lib/contentfulImage";
import { ArticleJsonLd } from "next-seo";
import { getSiteAuthor } from "@/constants/authors";
import HomeToolTeasers from "@/components/home/HomeToolTeasers";
import { HomePostCard } from "@/components/home/HomePostCard";
import Newsletter from "@/components/Newsletter";

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

    const relatedPosts = pickRelatedPosts(
      post,
      sameCategoryResponse.items as unknown as IPostData[],
      relatedPoolResponse.items as unknown as IPostData[],
      3,
    );
    const {
      coverImage,
      category: postCategory,
      title,
      content,
      excerpt,
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
    const readingTime = getReadingTime(content);
    const { nodes: articleNodes, insertedHref } = renderArticleBody(content);
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

        <div className="home-page bg-white">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-x-16 px-4 pb-14 pt-4 sm:px-5 min-[1024px]:grid-cols-[248px_minmax(0,760px)] min-[1024px]:justify-center min-[1024px]:px-8 min-[1024px]:pt-8">
            {shouldShowToc(tocHeadings) ? (
              <aside
                className="article-tools sticky top-[88px] hidden self-start min-[1024px]:block"
                aria-label="Article tools"
              >
                <ArticleToc headings={tocHeadings} variant="sidebar" />
                <div className="mt-8">
                  <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-mute">
                    Share
                  </p>
                  <div className="mt-3">
                    <ShareRow url={shareUrl} title={title} announce />
                  </div>
                </div>
              </aside>
            ) : (
              <div className="hidden min-[1024px]:block" />
            )}

            <div>
              <header>
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
                <h1 className="font-display text-[30px] font-bold leading-[1.2] tracking-tight text-ink md:text-[44px] md:leading-[1.15]">
                  {title}
                </h1>
                <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-mute md:text-[18px]">
                  {excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  {author.picture ? (
                    <Image
                      src={author.picture}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 flex-none rounded-full bg-mist object-cover"
                    />
                  ) : null}
                  <div>
                    <p className="text-[16px] text-ink">
                      By{" "}
                      <Link
                        href={`/authors/${author.slug}`}
                        className="inline-flex min-h-[var(--control-h)] items-center font-semibold text-[#0f766e] underline underline-offset-4 hover:text-[#115e59]"
                      >
                        {author.name}
                      </Link>
                    </p>
                    <p className="text-[16px] text-mute">
                      <time dateTime={toIsoTimestamp(publishedAt)}>
                        {formatLongDate(publishedAt)}
                      </time>
                      {wasUpdatedAfterPublish(publishedAt, updatedAt) ? (
                        <>
                          <span aria-hidden> · </span>
                          <time dateTime={toIsoTimestamp(updatedAt)}>
                            Updated {formatLongDate(updatedAt)}
                          </time>
                        </>
                      ) : null}
                      <span aria-hidden> · </span>
                      {readingTime} min read
                    </p>
                  </div>
                </div>
              </header>

              <figure className="mt-8 overflow-hidden rounded-xl border border-line bg-mist-soft">
                <CoverImage
                  src={contentfulImageUrl(coverImage.fields.file.url, 1200)}
                  alt={title}
                  width={1200}
                  height={630}
                  fetchPriority="high"
                  className="aspect-[1200/630] h-auto w-full object-cover"
                />
              </figure>

              {shouldShowToc(tocHeadings) ? (
                <ArticleToc headings={tocHeadings} variant="disclosure" />
              ) : null}

              <article className="article-wrapper prose-dd mt-10">
                {articleNodes}
              </article>

              <FaqSection
                layout="inline"
                id="faqs-section"
                headingId="faqs-heading"
                title="Frequently asked questions"
                items={faqList.map((faq) => ({
                  question: faq.question,
                  answer: faq.answer,
                }))}
              />

              {postTags.length > 0 ? (
                <nav aria-label="Tags" className="mt-12">
                  <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-mute">
                    Tags
                  </p>
                  <ul className="mt-3 m-0 flex list-none flex-wrap gap-2">
                    {postTags.map((item) => (
                      <li key={item.slug} className="m-0 list-none">
                        <Link
                          href={`/tags/${item.slug}`}
                          className="chip inline-flex h-[var(--control-h)] max-h-[var(--chip-h-max)] items-center rounded-full border border-[#cbd5e1] bg-white px-4 text-[16px] font-semibold text-[#334155] transition hover:border-[#0f766e] hover:bg-[#f0fdfa] hover:text-[#115e59]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}

              <section
                aria-labelledby="share-h"
                className="mt-10 border-y border-line py-6 min-[1024px]:hidden"
              >
                <h2
                  id="share-h"
                  className="mb-3 font-display text-[20px] font-bold text-ink"
                >
                  Share this article
                </h2>
                <ShareRow url={shareUrl} title={title} />
              </section>
              <section
                aria-labelledby="share-h-end"
                className="mt-10 hidden border-y border-line py-6 min-[1024px]:block"
              >
                <h2
                  id="share-h-end"
                  className="mb-3 font-display text-[20px] font-bold text-ink"
                >
                  Share this article
                </h2>
                <ShareRow url={shareUrl} title={title} />
              </section>

              <section
                aria-labelledby="au-h"
                className="mt-10 flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:gap-5 sm:p-6"
              >
                {author.picture ? (
                  <Image
                    src={author.picture}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 flex-none rounded-full bg-mist object-cover"
                  />
                ) : null}
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0f766e]">
                    {author.role}
                  </p>
                  <h2
                    id="au-h"
                    className="mt-1 font-display text-[20px] font-bold leading-tight text-ink md:text-[24px]"
                  >
                    <Link
                      href={`/authors/${author.slug}`}
                      className="inline-flex min-h-[var(--control-h)] items-center rounded hover:text-[#0f766e]"
                    >
                      {author.name}
                    </Link>
                  </h2>
                  <p className="text-[16px] leading-relaxed text-[#334155]">
                    {author.about}
                  </p>
                  <Link
                    href={`/authors/${author.slug}`}
                    className="mt-2 inline-flex min-h-[var(--control-h)] items-center gap-1.5 text-[16px] font-semibold text-[#0f766e] underline underline-offset-4 hover:text-[#115e59]"
                  >
                    All guides by {author.name}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </section>
            </div>
          </div>

          {relatedPosts.length > 0 ? (
            <section
              aria-labelledby="rel-h"
              className="border-t border-line bg-mist"
            >
              <div className="home-inner py-14 min-[1024px]:py-16">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="home-eyebrow">Related guides</p>
                    <h2 id="rel-h" className="home-h2">
                      Keep reading
                    </h2>
                  </div>
                  <Link href="/blogs" className="home-btn-secondary">
                    View all guides
                  </Link>
                </div>
                <ul className="mt-8 m-0 grid list-none gap-6 sm:grid-cols-2 min-[1024px]:grid-cols-3">
                  {relatedPosts.map((item) => (
                    <li key={item.fields.slug} className="m-0 h-full list-none">
                      <HomePostCard post={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          <HomeToolTeasers
            heading="More free calculators"
            sub=""
            headingId="mt-h"
            excludeHrefs={insertedHref ? [insertedHref] : []}
            columns={3}
            className="border-t border-line bg-white"
          />
          <Newsletter />
        </div>
      </>
    );
  } catch (error) {
    if (isNextNotFound(error)) throw error;
    redirect("/");
  }
}
