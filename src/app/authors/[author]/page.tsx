import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import config from "@/lib/config";
import AuthorPostsClient from "@/components/authors/AuthorPostsClient";
import { IAuthor, IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;

type PageProps = {
  params: { author: string };
  searchParams: { page?: string };
};

function parsePage(page?: string) {
  const value = Number(page) || 1;
  return value < 1 ? 1 : value;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  try {
    const author_response = await contentful_client.getEntries({
      content_type: "author",
      "fields.slug": params.author,
    });
    const author = author_response.items[0] as unknown as IAuthor | undefined;
    if (!author) {
      return {
        title: "Author Not Found",
        description: "The requested Digital Dialogue author could not be found.",
      };
    }

    const currentPage = parsePage(searchParams.page);
    const pageSuffix = currentPage > 1 ? `, Page ${currentPage}` : "";
    const title = `${author.fields.name}'s Articles${pageSuffix}`;
    const about = author.fields.about.replace(/\s+/g, " ").trim();
    const description =
      about.length > 160 ? `${about.slice(0, 157).trimEnd()}...` : about;
    const canonical =
      currentPage > 1
        ? `/authors/${params.author}?page=${currentPage}`
        : `/authors/${params.author}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { title, description, url: canonical },
    };
  } catch {
    return {
      title: "Digital Dialogue Author",
      description: "Browse articles by a Digital Dialogue author.",
    };
  }
}

export default async function AuthorPage({ params, searchParams }: PageProps) {
  try {
    const currentPage = parsePage(searchParams.page);

    const author_response = await contentful_client.getEntries({
      content_type: "author",
      "fields.slug": params.author,
    });

    if (!author_response.items.length) notFound();

    const author = author_response.items[0] as unknown as IAuthor;

    const posts_response = await contentful_client.getEntries({
      content_type: "post",
      limit: config.BLOGS_PER_PAGE,
      skip: (currentPage - 1) * config.BLOGS_PER_PAGE,
      links_to_entry: author.sys.id,
      order: "-sys.updatedAt",
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
        authorName={author.fields.name}
        authorSlug={author.fields.slug}
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
