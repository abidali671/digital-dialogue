import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import contentful_client, {
  CONTENTFUL_REVALIDATE,
} from "@/lib/contentful/client";
import CategoryBlogsClient from "@/components/blogs/CategoryBlogsClient";
import { ICategoryData, IPostData } from "@/types";

export const revalidate = CONTENTFUL_REVALIDATE;

type PageProps = {
  params: { category: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const category_response = await contentful_client.getEntries({
    content_type: "category",
    "fields.slug": params.category,
  });

  const category = category_response.items[0] as unknown as ICategoryData | undefined;
  if (!category) return { title: "Category" };

  return {
    title: `${category.fields.label} | Category`,
    description: (category.fields as any).description || category.fields.label,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  try {
    const category_response = await contentful_client.getEntries({
      content_type: "category",
      "fields.slug": params.category,
    });

    if (!category_response.items.length) notFound();

    const category = category_response.items[0] as unknown as ICategoryData;

    const response = await contentful_client.getEntries({
      content_type: "post",
      links_to_entry: category.sys.id,
    });

    return (
      <CategoryBlogsClient
        posts={response.items as unknown as IPostData[]}
        categoryLabel={String(category.fields.label)}
      />
    );
  } catch {
    redirect("/");
  }
}
