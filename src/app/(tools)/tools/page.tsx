import type { Metadata } from "next";
import ToolsListing from "@/components/tools/ToolsListing";
import config from "@/lib/config";
import { parseSearchQuery } from "@/lib/listing";
import { DEFAULT_OG_IMAGE, pageTitle, resolvePageTitle } from "@/lib/metadata";
import { breadcrumbSchema, JsonLdScript } from "@/lib/schema";
import {
  HUB_TOOLS,
  TOOL_FAQS,
  TOOLS_PAGE_DESCRIPTION,
  TOOLS_PAGE_TITLE,
} from "@/lib/toolsHub";

const PATH = "/tools";

export const metadata: Metadata = {
  title: pageTitle(TOOLS_PAGE_TITLE),
  description: TOOLS_PAGE_DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: resolvePageTitle(TOOLS_PAGE_TITLE),
    description: TOOLS_PAGE_DESCRIPTION,
    url: PATH,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: resolvePageTitle(TOOLS_PAGE_TITLE),
    description: TOOLS_PAGE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

type PageProps = {
  searchParams: { q?: string };
};

export default function ToolsPage({ searchParams }: PageProps) {
  const searchQuery = parseSearchQuery(searchParams.q);
  const needle = searchQuery.toLowerCase();
  const tools = needle
    ? HUB_TOOLS.filter((tool) =>
        `${tool.title} ${tool.copy}`.toLowerCase().includes(needle)
      )
    : HUB_TOOLS;

  return (
    <>
      {!searchQuery && (
        <JsonLdScript
          data={[
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Tools", path: PATH },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: TOOLS_PAGE_TITLE,
              description: TOOLS_PAGE_DESCRIPTION,
              url: `${config.BASE_URL}${PATH}`,
              isPartOf: {
                "@type": "WebSite",
                name: config.SITE_NAME,
                url: config.BASE_URL,
              },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: HUB_TOOLS.length,
                itemListElement: HUB_TOOLS.map((tool, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: tool.title,
                  url: `${config.BASE_URL}${tool.href}`,
                  description: tool.copy,
                })),
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: TOOL_FAQS.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]}
        />
      )}
      <ToolsListing tools={tools} searchQuery={searchQuery} />
    </>
  );
}
