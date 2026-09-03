import config from "@/lib/config";

type JsonLd = Record<string, unknown>;

export function JsonLdScript({ data }: { data: JsonLd | JsonLd[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.SITE_NAME,
    url: config.BASE_URL,
    logo: `${config.BASE_URL}/logo.webp`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${config.BASE_URL}/contact-us`,
    },
    sameAs: [config.LINKEDIN_URL, config.UPWORK_URL, config.FIVERR_URL],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.SITE_NAME,
    url: config.BASE_URL,
    description: config.DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: config.SITE_NAME,
      url: config.BASE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${config.BASE_URL}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http")
        ? item.path
        : `${config.BASE_URL}${item.path}`,
    })),
  };
}
