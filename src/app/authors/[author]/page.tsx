import type { Metadata } from "next";
import { redirect } from "next/navigation";
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
}: PageProps): Promise<Metadata> {
  const author_response = await contentful_client.getEntries({
    content_type: "author",
    "fields.slug": params.author,
  });
  const author = author_response.items[0] as unknown as IAuthor | undefined;
  if (!author) return { title: "Author" };

  return {
    title: `${author.fields.name} | Author`,
    description: author.fields.about,
  };
}

export default async function AuthorPage({ params, searchParams }: PageProps) {
  try {
    const currentPage = parsePage(searchParams.page);

    const author_response = await contentful_client.getEntries({
      content_type: "author",
      "fields.slug": params.author,
    });

    if (!author_response.items.length) redirect("/");

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
  } catch {
    redirect("/");
  }
}
