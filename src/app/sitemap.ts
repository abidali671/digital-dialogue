import type { MetadataRoute } from "next";
import contentful_client, {
  REVALIDATE_LISTING,
  type GetEntriesQuery,
} from "@/lib/contentful/client";
import config from "@/lib/config";
import type { IAuthor, ICategoryData, IPostData } from "@/types";

export const revalidate = REVALIDATE_LISTING;

async function getAllEntries(query: GetEntriesQuery) {
  const limit = 100;
  let skip = 0;
  const items: Awaited<
    ReturnType<typeof contentful_client.getEntries>
  >["items"] = [];
  let total = Infinity;

  while (skip < total) {
    const page = await contentful_client.getEntries(
      { ...query, limit, skip },
      { revalidate: REVALIDATE_LISTING },
    );
    items.push(...page.items);
    total = page.total;
    skip += limit;
  }

  return items;
}

function entry(
  path: string,
  options: {
    lastModified?: string | Date;
    changeFrequency?: string;
    priority?: number;
  } = {},
) {
  return {
    url: path === "/" ? config.BASE_URL : `${config.BASE_URL}${path}`,
    lastModified: options.lastModified
      ? new Date(options.lastModified)
      : new Date(),
    changeFrequency: options.changeFrequency ?? "weekly",
    priority: options.priority ?? 0.5,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    entry("/", { changeFrequency: "daily", priority: 1 }),
    entry("/blogs", { changeFrequency: "daily", priority: 0.9 }),
    entry("/authors", { changeFrequency: "weekly", priority: 0.6 }),
    entry("/contact-us", { changeFrequency: "yearly", priority: 0.3 }),
    entry("/privacy-policy", { changeFrequency: "yearly", priority: 0.3 }),
  ];

  try {
    const [posts, categories, authors] = await Promise.all([
      getAllEntries({ content_type: "post", include: 1 }),
      getAllEntries({ content_type: "category", include: 0 }),
      getAllEntries({ content_type: "author", include: 0 }),
    ]);

    const categoryRoutes = (categories as unknown as ICategoryData[]).map(
      (category) =>
        entry(`/blogs/${category.fields.slug}`, {
          lastModified: category.sys.updatedAt,
          changeFrequency: "weekly",
          priority: 0.7,
        }),
    );

    const postRoutes = (posts as unknown as IPostData[])
      .filter(
        (post) => post.fields?.slug && post.fields?.category?.fields?.slug,
      )
      .map((post) =>
        entry(
          `/blogs/${post.fields.category.fields.slug}/${post.fields.slug}`,
          {
            lastModified: post.sys.updatedAt,
            changeFrequency: "weekly",
            priority: 0.8,
          },
        ),
      );

    const authorRoutes = (authors as unknown as IAuthor[]).map((author) =>
      entry(`/authors/${author.fields.slug}`, {
        lastModified: author.sys.updatedAt,
        changeFrequency: "monthly",
        priority: 0.5,
      }),
    );

    return [...staticRoutes, ...categoryRoutes, ...postRoutes, ...authorRoutes];
  } catch (error) {
    console.error("Sitemap: failed to load Contentful entries", error);
    return staticRoutes;
  }
}
