/** Default cache for all pages and Contentful fetches — 1 minute */
export const REVALIDATE_LISTING = 60;

/** Same as listing for now (1 minute) */
export const REVALIDATE_DETAIL = REVALIDATE_LISTING;

type ContentfulLink = {
  sys: {
    type: "Link";
    linkType: "Entry" | "Asset";
    id: string;
  };
};

type ContentfulEntity = {
  sys: { id: string; type: string; [key: string]: unknown };
  fields?: Record<string, unknown>;
  [key: string]: unknown;
};

type ContentfulResponse = {
  items: ContentfulEntity[];
  includes?: {
    Entry?: ContentfulEntity[];
    Asset?: ContentfulEntity[];
  };
  total: number;
  skip?: number;
  limit?: number;
};

export type GetEntriesQuery = {
  content_type?: string;
  limit?: number;
  skip?: number;
  include?: number;
  links_to_entry?: string;
  [key: string]: string | number | undefined;
};

function isLink(value: unknown): value is ContentfulLink {
  return (
    typeof value === "object" &&
    value !== null &&
    "sys" in value &&
    (value as ContentfulLink).sys?.type === "Link" &&
    Boolean((value as ContentfulLink).sys?.id)
  );
}

function resolveLinks(
  value: unknown,
  entryMap: Map<string, ContentfulEntity>,
  assetMap: Map<string, ContentfulEntity>,
  seen = new Set<string>()
): unknown {
  if (Array.isArray(value)) {
    return value.map((item) =>
      resolveLinks(item, entryMap, assetMap, seen)
    );
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  if (isLink(value)) {
    const map = value.sys.linkType === "Asset" ? assetMap : entryMap;
    const resolved = map.get(value.sys.id);
    if (!resolved || seen.has(value.sys.id)) return value;
    seen.add(value.sys.id);
    return resolveLinks(resolved, entryMap, assetMap, seen);
  }

  const obj = value as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  for (const [key, nested] of Object.entries(obj)) {
    result[key] = resolveLinks(nested, entryMap, assetMap, seen);
  }
  return result;
}

function resolveResponse(data: ContentfulResponse) {
  const entryMap = new Map<string, ContentfulEntity>();
  const assetMap = new Map<string, ContentfulEntity>();

  for (const entry of data.includes?.Entry ?? []) {
    entryMap.set(entry.sys.id, entry);
  }
  for (const asset of data.includes?.Asset ?? []) {
    assetMap.set(asset.sys.id, asset);
  }
  for (const item of data.items) {
    entryMap.set(item.sys.id, item);
  }

  return {
    ...data,
    items: data.items.map(
      (item) =>
        resolveLinks(item, entryMap, assetMap) as ContentfulEntity
    ),
  };
}

async function getEntries(
  query: GetEntriesQuery = {},
  options?: { revalidate?: number }
) {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";
  const accessToken = process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;

  if (!space || !accessToken) {
    throw new Error("Missing Contentful environment variables");
  }

  const params = new URLSearchParams();
  params.set("access_token", accessToken);

  const { include = 2, ...rest } = query;
  params.set("include", String(include));

  for (const [key, value] of Object.entries(rest)) {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  }

  const url = `https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries?${params.toString()}`;
  const revalidate = options?.revalidate ?? REVALIDATE_LISTING;

  const res = await fetch(url, {
    next: { revalidate },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Contentful request failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as ContentfulResponse;
  return resolveResponse(data);
}

const contentful_client = {
  getEntries,
};

export default contentful_client;
