import type { Metadata } from "next";
import { redirect } from "next/navigation";
import contentful_client, {
  CONTENTFUL_REVALIDATE,
} from "@/lib/contentful/client";
import config from "@/lib/config";
import AuthorPostsClient from "@/components/authors/AuthorPostsClient";
import { IAuthor, IPostData } from "@/types";

export const revalidate = CONTENTFUL_REVALIDATE;

type PageProps = {
  params: { author: string };
};

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

export default async function AuthorPage({ params }: PageProps) {
  try {
    const author_response = await contentful_client.getEntries({
      content_type: "author",
      "fields.slug": params.author,
    });

    if (!author_response.items.length) redirect("/");

    const author = author_response.items[0] as unknown as IAuthor;

    const posts_response = await contentful_client.getEntries({
      content_type: "post",
      limit: config.BLOGS_PER_PAGE,
      links_to_entry: author.sys.id,
    });

    return (
      <AuthorPostsClient
        initialPosts={posts_response.items as unknown as IPostData[]}
        totalPosts={posts_response.total}
        authorName={author.fields.name}
      />
    );
  } catch {
    redirect("/");
  }
}
