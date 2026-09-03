import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import config from "@/lib/config";
import CategoryBlogsClient from "@/components/blogs/CategoryBlogsClient";
import { parseSearchQuery } from "@/lib/listing";
import { ICategoryData, IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;

type PageProps = {
  params: { category: string };
  searchParams: { q?: string; page?: string };
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
    const category_response = await contentful_client.getEntries({
      content_type: "category",
      "fields.slug": params.category,
    });
    const category = category_response.items[0] as unknown as
      | ICategoryData
      | undefined;

    if (!category) {
      return {
        title: "Blog Category",
        description: "Browse practical articles by topic on Digital Dialogue.",
      };
    }

    const currentPage = parsePage(searchParams.page);
    const pageSuffix = currentPage > 1 ? `, Page ${currentPage}` : "";
    const label = String(category.fields.label);
    const title = `${label} Articles${pageSuffix}`;
    const fallback = `Browse practical ${label.toLowerCase()} articles, guides, and tips from Digital Dialogue.`;
    const rawDescription = (category.fields.description || fallback)
      .replace(/\s+/g, " ")
      .trim();
    const description =
      rawDescription.length > 160
        ? `${rawDescription.slice(0, 157).trimEnd()}...`
        : rawDescription;
    const canonical =
      currentPage > 1
        ? `/blogs/${params.category}?page=${currentPage}`
        : `/blogs/${params.category}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: { title, description, url: canonical },
    };
  } catch {
    return {
      title: "Blog Category",
      description: "Browse practical articles by topic on Digital Dialogue.",
    };
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  try {
    const searchQuery = parseSearchQuery(searchParams.q);
    const currentPage = parsePage(searchParams.page);

    const category_response = await contentful_client.getEntries({
      content_type: "category",
      "fields.slug": params.category,
    });

    if (!category_response.items.length) notFound();

    const category = category_response.items[0] as unknown as ICategoryData;
    const label = String(category.fields.label);
    const description =
      category.fields.description?.replace(/\s+/g, " ").trim() ||
      `Browse practical ${label.toLowerCase()} articles, guides, and tips from Digital Dialogue.`;

    const response = await contentful_client.getEntries({
      content_type: "post",
      links_to_entry: category.sys.id,
      order: "-sys.updatedAt",
      limit: config.BLOGS_PER_PAGE,
      skip: (currentPage - 1) * config.BLOGS_PER_PAGE,
      ...(searchQuery ? { query: searchQuery } : {}),
    });

    const totalPages = Math.max(
      1,
      Math.ceil(response.total / config.BLOGS_PER_PAGE)
    );

    return (
      <CategoryBlogsClient
        posts={response.items as unknown as IPostData[]}
        title={label}
        description={description}
        basePath={`/blogs/${params.category}`}
        searchQuery={searchQuery}
        currentPage={Math.min(currentPage, totalPages)}
        totalPages={totalPages}
      />
    );
  } catch {
    redirect("/");
  }
}
