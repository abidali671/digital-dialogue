import type { Metadata } from "next";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import constants from "@/constants";
import AuthorsClient from "@/components/authors/AuthorsClient";
import { IAuthor } from "@/types";

export const revalidate = REVALIDATE_LISTING;

export const metadata: Metadata = {
  title: "Meet Our Authors",
  description: constants.descriptions.AUTHORS,
  alternates: { canonical: "/authors" },
  openGraph: {
    title: "Meet Our Authors",
    description: constants.descriptions.AUTHORS,
    url: "/authors",
  },
};

export default async function AuthorsPage() {
  const response = await contentful_client.getEntries({
    content_type: "author",
  });

  return (
    <AuthorsClient authors={response.items as unknown as IAuthor[]} />
  );
}
