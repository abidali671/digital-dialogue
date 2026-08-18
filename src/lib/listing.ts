export function parseSearchQuery(q?: string) {
  return (q || "").trim();
}

export function listingHref(
  basePath: string,
  options?: { page?: number; q?: string }
) {
  const params = new URLSearchParams();
  const query = parseSearchQuery(options?.q);
  const page = options?.page ?? 1;

  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));

  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
