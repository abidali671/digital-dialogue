import type { Metadata } from "next";
import contentful_client, {
  CONTENTFUL_REVALIDATE,
} from "@/lib/contentful/client";
import constants from "@/constants";
import AuthorsClient from "@/components/authors/AuthorsClient";
import { IAuthor } from "@/types";

export const revalidate = CONTENTFUL_REVALIDATE;

export const metadata: Metadata = {
  title: "Authors",
  description: constants.descriptions.AUTHORS,
};

export default async function AuthorsPage() {
  const response = await contentful_client.getEntries({
    content_type: "author",
  });

  return (
    <AuthorsClient authors={response.items as unknown as IAuthor[]} />
  );
}
