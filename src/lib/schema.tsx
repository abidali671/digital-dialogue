import config from "@/lib/config";

type JsonLd = Record<string, unknown>;

/** Same file the homepage Organization schema declares as its logo. */
const PUBLISHER_LOGO_URL = `${config.BASE_URL}/logo.webp`;

export function JsonLdScript({ data }: { data: JsonLd | JsonLd[] }) {
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.SITE_NAME,
    url: config.BASE_URL,
    logo: PUBLISHER_LOGO_URL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${config.BASE_URL}/contact-us`,
    },
    sameAs: [config.LINKEDIN_URL, config.UPWORK_URL, config.FIVERR_URL],
  };
}

/**
 * Publisher on article pages. next-seo's publisherLogo prop omits the
 * organization url, so the article passes this object through instead.
 */
export function articlePublisher() {
  return {
    "@type": "Organization" as const,
    name: config.SITE_NAME,
    url: config.BASE_URL,
    logo: {
      "@type": "ImageObject" as const,
      url: PUBLISHER_LOGO_URL,
    },
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
