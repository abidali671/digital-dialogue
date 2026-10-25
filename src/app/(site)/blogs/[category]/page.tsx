import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import config from "@/lib/config";
import CategoryBlogsClient from "@/components/blogs/CategoryBlogsClient";
import { parseSearchQuery } from "@/lib/listing";
import { isNextNotFound } from "@/lib/next-errors";
import {
  assertPageInRange,
  pageCount,
  parsePageQuery,
} from "@/lib/pagination";
import { DEFAULT_OG_IMAGE, pageTitle, resolvePageTitle, withPageMetaDescription } from "@/lib/metadata";
import { ICategoryData, IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;

type PageProps = {
  params: { category: string };
  searchParams: { q?: string; page?: string };
};

const loadCategoryPage = cache(
  async (categorySlug: string, page: number, searchQuery: string) => {
    const category_response = await contentful_client.getEntries({
      content_type: "category",
      "fields.slug": categorySlug,
    });
    const category = category_response.items[0] as unknown as
      | ICategoryData
      | undefined;
    if (!category) return { category: null, posts: [], totalPages: 1 };

    const response = await contentful_client.getEntries({
      content_type: "post",
      links_to_entry: category.sys.id,
      order: "-sys.updatedAt",
      limit: config.BLOGS_PER_PAGE,
      skip: (page - 1) * config.BLOGS_PER_PAGE,
      ...(searchQuery ? { query: searchQuery } : {}),
    });

    return {
      category,
      posts: response.items as unknown as IPostData[],
      totalPages: pageCount(response.total, config.BLOGS_PER_PAGE),
    };
  }
);

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  try {
    const currentPage = parsePageQuery(searchParams.page);
    const searchQuery = parseSearchQuery(searchParams.q);
    const { category, totalPages } = await loadCategoryPage(
      params.category,
      currentPage,
      searchQuery
    );
    if (!category) notFound();
    assertPageInRange(currentPage, totalPages);

    const pageSuffix = currentPage > 1 ? `, Page ${currentPage}` : "";
    const label = String(category.fields.label);
    const title = `${label} Articles${pageSuffix}`;
    const resolvedTitle = resolvePageTitle(title);
    const fallback = `Browse practical ${label.toLowerCase()} articles, guides, and tips from Digital Dialogue.`;
    const rawDescription = (category.fields.description || fallback)
      .replace(/\s+/g, " ")
      .trim();
    const description = withPageMetaDescription(
      rawDescription.length > 160
        ? `${rawDescription.slice(0, 157).trimEnd()}...`
        : rawDescription,
      currentPage
    );
    const canonical =
      currentPage > 1
        ? `/blogs/${params.category}?page=${currentPage}`
        : `/blogs/${params.category}`;

    return {
      title: pageTitle(title),
      description,
      alternates: { canonical },
      openGraph: {
        title: resolvedTitle,
        description,
        url: canonical,
        images: [DEFAULT_OG_IMAGE],
      },
    };
  } catch (error) {
    if (isNextNotFound(error)) throw error;
    return {
      title: pageTitle("Blog Category"),
      description: "Browse practical articles by topic on Digital Dialogue.",
    };
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  try {
    const searchQuery = parseSearchQuery(searchParams.q);
    const currentPage = parsePageQuery(searchParams.page);
    const { category, posts, totalPages } = await loadCategoryPage(
      params.category,
      currentPage,
      searchQuery
    );
    if (!category) notFound();
    assertPageInRange(currentPage, totalPages);

    const label = String(category.fields.label);
    const description =
      category.fields.description?.replace(/\s+/g, " ").trim() ||
      `Browse practical ${label.toLowerCase()} articles, guides, and tips from Digital Dialogue.`;

    return (
      <CategoryBlogsClient
        posts={posts}
        title={label}
        description={description}
        basePath={`/blogs/${params.category}`}
        searchQuery={searchQuery}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    );
  } catch (error) {
    if (isNextNotFound(error)) throw error;
    redirect("/");
  }
}
