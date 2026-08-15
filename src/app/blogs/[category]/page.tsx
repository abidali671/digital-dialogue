import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import contentful_client, {
  REVALIDATE_LISTING,
} from "@/lib/contentful/client";
import CategoryBlogsClient from "@/components/blogs/CategoryBlogsClient";
import { ICategoryData, IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;

type PageProps = {
  params: { category: string };
};

export async function generateMetadata({
  params,
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

    const label = String(category.fields.label);
    const title = `${label} Articles`;
    const fallback = `Browse practical ${label.toLowerCase()} articles, guides, and tips from Digital Dialogue.`;
    const rawDescription = (category.fields.description || fallback)
      .replace(/\s+/g, " ")
      .trim();
    const description =
      rawDescription.length > 160
        ? `${rawDescription.slice(0, 157).trimEnd()}...`
        : rawDescription;
    const canonical = `/blogs/${params.category}`;

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
      order: "-sys.updatedAt",
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
