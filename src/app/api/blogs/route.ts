import { NextRequest, NextResponse } from "next/server";
import contentful_client, {
  CONTENTFUL_REVALIDATE,
} from "@/lib/contentful/client";
import config from "@/lib/config";

export const revalidate = CONTENTFUL_REVALIDATE;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page_no = Number(searchParams.get("page")) || 1;
    const links_to_entry = searchParams.get("links_to_entry") || undefined;

    const response = await contentful_client.getEntries({
      content_type: "post",
      limit: config.BLOGS_PER_PAGE,
      skip: (page_no - 1) * config.BLOGS_PER_PAGE,
      links_to_entry,
    });

    return NextResponse.json(
      { items: response.items, total: response.total },
      {
        headers: {
          "Cache-Control": `s-maxage=${CONTENTFUL_REVALIDATE}, stale-while-revalidate`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
