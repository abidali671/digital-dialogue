"use client";

import React, { useMemo, useState } from "react";
import { ContentContainer, Title } from "@/components";
import SearchIcon from "@/assets/icon/searchIcon";
import { IAuthor } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PropsT {
  authors: IAuthor[];
}

const AuthorsClient = ({ authors }: PropsT) => {
  const [searchText, setSearchText] = useState("");

  const filteredAuthors = useMemo(() => {
    return authors.filter(
      (author) =>
        author.fields.name.toLowerCase().includes(searchText.toLowerCase()) ||
        author.fields.about.toLowerCase().includes(searchText.toLowerCase()) ||
        author.fields.role.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [authors, searchText]);

  return (
    <div className="relative pb-16">
      <div className="w-full border-b border-line bg-white">
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-12">
          <div className="flex h-12 w-full max-w-xl items-center gap-3 rounded-lg border border-line bg-mist px-4">
            <SearchIcon className="h-5 w-5 text-mute" />
            <input
              type="text"
              className="w-full border-none bg-transparent text-ink outline-0 placeholder:text-mute-soft"
              placeholder="Search authors"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <ContentContainer className="relative flex flex-col justify-center pt-10">
        <Title>Authors</Title>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 lg:grid-cols-3">
          {filteredAuthors.map((author) => (
            <Link
              key={author.sys.id}
              href={`/authors/${author.fields.slug}`}
              className="group relative pt-16"
            >
              <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 overflow-hidden rounded-full border-4 border-accent/30">
                <Image
                  alt={author.fields.picture.fields.title}
                  src={"https:" + author.fields.picture.fields.file.url}
                  height={128}
                  width={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="border border-line bg-white p-4 pt-16 transition-colors group-hover:border-accent/40">
                <h4 className="text-center font-display text-2xl font-bold text-ink">
                  {author.fields.name}
                </h4>
                <p className="text-center font-mono text-xs uppercase tracking-wide text-accent">
                  {author.fields.role}
                </p>
                <p className="mt-3 text-center text-sm font-semibold text-ink">
                  About
                </p>
                <p className="text-center text-base text-mute">
                  {author.fields.about}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </ContentContainer>
    </div>
  );
};

export default AuthorsClient;
