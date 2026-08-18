"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@/assets/icon/searchIcon";
import { listingHref, parseSearchQuery } from "@/lib/listing";

interface PropsT {
  searchQuery: string;
  basePath: string;
}

const PostSearch = ({ searchQuery, basePath }: PropsT) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState(searchQuery);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (document.activeElement === inputRef.current) return;
    setSearchText(searchQuery);
  }, [searchQuery]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = parseSearchQuery(searchText);
    startTransition(() => {
      router.replace(listingHref(basePath, { q: nextQuery }));
    });
  }

  return (
    <div className="w-full border-b border-line bg-white">
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-12">
        <form
          role="search"
          onSubmit={onSubmit}
          aria-busy={isPending}
          className="w-full max-w-xl"
        >
          <div className="flex h-12 items-center gap-2 rounded-lg border border-line bg-mist pl-4 pr-1 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent">
            <SearchIcon className="h-5 w-5 shrink-0 text-mute" />
            <input
              ref={inputRef}
              type="search"
              className="h-full min-w-0 flex-1 appearance-none border-0 bg-transparent text-ink shadow-none outline-none ring-0 placeholder:text-mute-soft focus:border-0 focus:outline-none focus:ring-0"
              placeholder="Search posts"
              aria-label="Search posts"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="h-9 shrink-0 rounded-md bg-accent px-4 text-sm font-bold text-white outline-none transition-colors hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-white disabled:opacity-70"
              disabled={isPending}
            >
              {isPending ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostSearch;
