import type { Metadata } from "next";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import constants from "@/constants";
import AuthorsClient from "@/components/authors/AuthorsClient";
import { pageTitle, resolvePageTitle } from "@/lib/metadata";
import { IAuthor } from "@/types";

export const revalidate = REVALIDATE_LISTING;

const AUTHORS_TITLE = "Meet Our Authors";

export const metadata: Metadata = {
  title: pageTitle(AUTHORS_TITLE),
  description: constants.descriptions.AUTHORS,
  alternates: { canonical: "/authors" },
  openGraph: {
    title: resolvePageTitle(AUTHORS_TITLE),
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
