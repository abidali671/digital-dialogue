/** True when `notFound()` threw. Catch blocks must rethrow this or the response becomes a 200. */
export function isNextNotFound(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    (error as { digest?: string }).digest === "NEXT_NOT_FOUND"
  );
}
