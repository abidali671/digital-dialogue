import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ContentContainer from "@/components/ContentContainer";
import PostCard from "@/components/PostCard";
import PostFaqs from "@/components/PostFaqs";
import ShareButtons from "@/components/ShareButtons";
import Tag from "@/components/Tag";
import Title from "@/components/Title";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import contentful_client, {
  REVALIDATE_DETAIL,
} from "@/lib/contentful/client";
import { ICategoryData, IFaq, IPostData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import config from "@/lib/config";
import { formatLongDate, getPublishedDate, getReadingTime, shuffleArray } from "@/helper";
import { ArticleJsonLd, FAQPageJsonLd } from "next-seo";

export const revalidate = REVALIDATE_DETAIL;

type PageProps = {
  params: { category: string; blog_detail: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const category_response = await contentful_client.getEntries(
      {
        content_type: "category",
        "fields.slug": params.category,
      },
      { revalidate: REVALIDATE_DETAIL }
    );
    const response = await contentful_client.getEntries(
      {
        content_type: "post",
        "fields.slug": params.blog_detail,
        links_to_entry: category_response.items[0].sys.id,
      },
      { revalidate: REVALIDATE_DETAIL }
    );
    const post = response.items[0] as unknown as IPostData;
    const url = `${config.BASE_URL}/blogs/${params.category}/${params.blog_detail}`;

    return {
      title: `${post.fields.title} | Blog`,
      description: post.fields.excerpt,
      alternates: { canonical: url },
      openGraph: {
        title: post.fields.title,
        description: post.fields.excerpt,
        url,
        type: "article",
        images: ["https:" + post.fields.coverImage.fields.file.url],
      },
    };
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  try {
    const { category, blog_detail } = params;

    const [category_response, categories_response] = await Promise.all([
      contentful_client.getEntries(
        {
          content_type: "category",
          "fields.slug": category,
        },
        { revalidate: REVALIDATE_DETAIL }
      ),
      contentful_client.getEntries(
        { content_type: "category" },
        { revalidate: REVALIDATE_DETAIL }
      ),
    ]);

    const response = await contentful_client.getEntries(
      {
        content_type: "post",
        "fields.slug": blog_detail,
        links_to_entry: category_response.items[0].sys.id,
      },
      { revalidate: REVALIDATE_DETAIL }
    );

    const suggested_post_response = await contentful_client.getEntries(
      {
        content_type: "post",
        limit: 20,
        "sys.id[ne]": response.items[0].sys.id,
      },
      { revalidate: REVALIDATE_DETAIL }
    );

    if (!response?.items?.length || !category_response?.items?.length) {
      throw new Error("Not found");
    }

    const post = response.items[0] as unknown as IPostData;
    const suggestedPost = shuffleArray([
      ...suggested_post_response.items,
    ]).slice(0, 3) as unknown as IPostData[];
    const categories = categories_response.items as unknown as ICategoryData[];

    const {
      coverImage,
      category: postCategory,
      title,
      author,
      content,
      tags,
      excerpt,
      keywords,
      faqs,
    } = post.fields;
    const { createdAt, updatedAt } = post.sys;
    const publishedAt = getPublishedDate(post.sys);
    const formattedTags = tags?.map((tag) => tag.fields.label).join(", ");
    const blogKeywords = keywords ?? formattedTags;
    const keywordList = Array.from(
      new Set(
        (blogKeywords ?? "")
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean)
      )
    );
    const faqList = (faqs ?? []).filter(
      (faq): faq is IFaq =>
        Boolean(faq?.question?.trim() && faq?.answer?.trim())
    );
    const shareUrl = `${config.BASE_URL}/blogs/${category}/${blog_detail}`;
    const readingTime = getReadingTime(content);

    return (
      <>
        <ArticleJsonLd
          type="Blog"
          title={title}
          description={excerpt}
          authorName={author.fields.name}
          url={shareUrl}
          keywords={keywords || formattedTags}
          datePublished={formatLongDate(createdAt)}
          dateModified={formatLongDate(updatedAt)}
          images={["https:" + coverImage.fields.file.url]}
          useAppDir
        />
        {faqList.length > 0 && (
          <FAQPageJsonLd
            useAppDir
            mainEntity={faqList.map((faq) => ({
              questionName: faq.question,
              acceptedAnswerText: faq.answer,
            }))}
          />
        )}

        <header className="border-b border-line bg-white">
          <ContentContainer className="py-12 md:py-16">
            <div className="reading-column">
              <nav className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-mute">
                <Link href="/blogs" className="hover:text-accent">
                  Blogs
                </Link>
                <span className="text-mute-soft">/</span>
                <Link
                  href={`/blogs/${postCategory.fields.slug}`}
                  className="text-accent hover:text-accent-hover"
                >
                  {postCategory.fields.label}
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
                      href={`/authors/${author.fields.slug}`}
                      className="block text-base font-semibold text-ink hover:text-accent"
                    >
                      {author.fields.name}
                    </Link>
                    <p className="font-mono text-xs text-mute-soft">
                      {formatLongDate(publishedAt)} ·{" "}
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
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </ContentContainer>

        <ContentContainer className="pb-4 pt-10">
          <div className="reading-column">
            <article className="article-wrapper">
              {documentToReactComponents(content)}
            </article>

            <PostFaqs faqs={faqList} />

            {keywordList.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2">
                {keywordList.map((keyword) => (
                  <Tag key={keyword}>{keyword}</Tag>
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
                  href={`/authors/${author.fields.slug}`}
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
              {suggestedPost.map((item) => (
                <PostCard key={item.fields.slug} data={item} />
              ))}
            </div>

            <div className="mt-14 border-t border-line pt-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-mute">
                Browse categories
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((data) => (
                  <Link
                    key={data.fields.slug}
                    href={`/blogs/${data.fields.slug}`}
                    className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    {data.fields.label}
                  </Link>
                ))}
              </div>
            </div>
          </ContentContainer>
        </section>
      </>
    );
  } catch {
    redirect("/");
  }
}
