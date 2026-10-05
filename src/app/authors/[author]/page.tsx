import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import config from "@/lib/config";
import AuthorPostsClient from "@/components/authors/AuthorPostsClient";
import { getAuthorBySlug } from "@/constants/authors";
import { parseSearchQuery } from "@/lib/listing";
import { pageTitle, resolvePageTitle, withPageMetaDescription } from "@/lib/metadata";
import { IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;

type PageProps = {
  params: { author: string };
  searchParams: { page?: string; q?: string };
};

function parsePage(page?: string) {
  const value = Number(page) || 1;
  return value < 1 ? 1 : value;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const author = getAuthorBySlug(params.author);
  if (!author) {
    return {
      title: pageTitle("Author Not Found"),
      description: "The requested Digital Dialogue author could not be found.",
    };
  }

  const currentPage = parsePage(searchParams.page);
  const pageSuffix = currentPage > 1 ? `, Page ${currentPage}` : "";
  const title = `${author.name}'s Articles${pageSuffix}`;
  const resolvedTitle = resolvePageTitle(title);
  const about = author.about.replace(/\s+/g, " ").trim();
  const description = withPageMetaDescription(
    about.length > 160 ? `${about.slice(0, 157).trimEnd()}...` : about,
    currentPage
  );
  const canonical =
    currentPage > 1
      ? `/authors/${params.author}?page=${currentPage}`
      : `/authors/${params.author}`;

  return {
    title: pageTitle(title),
    description,
    alternates: { canonical },
    openGraph: { title: resolvedTitle, description, url: canonical },
  };
}

export default async function AuthorPage({ params, searchParams }: PageProps) {
  try {
    const author = getAuthorBySlug(params.author);
    if (!author) notFound();

    const currentPage = parsePage(searchParams.page);
    const searchQuery = parseSearchQuery(searchParams.q);

    // Site author is static; all posts are attributed to them.
    const posts_response = await contentful_client.getEntries({
      content_type: "post",
      limit: config.BLOGS_PER_PAGE,
      skip: (currentPage - 1) * config.BLOGS_PER_PAGE,
      order: "-sys.updatedAt",
      ...(searchQuery ? { query: searchQuery } : {}),
    });

    const totalPages = Math.max(
      1,
      Math.ceil(posts_response.total / config.BLOGS_PER_PAGE)
    );

    return (
      <AuthorPostsClient
        posts={posts_response.items as unknown as IPostData[]}
        currentPage={Math.min(currentPage, totalPages)}
        totalPages={totalPages}
        authorName={author.name}
        authorSlug={author.slug}
        authorRole={author.role}
        authorAbout={author.about}
        authorPictureUrl={author.picture}
        authorPictureAlt={author.pictureAlt}
        testimonials={author.testimonials}
        searchQuery={searchQuery}
      />
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      (error as { digest?: string }).digest === "NEXT_NOT_FOUND"
    ) {
      throw error;
    }
    redirect("/");
  }
}
