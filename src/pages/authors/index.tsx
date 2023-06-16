import React from "react";
import { ContentContainer } from "@/components";
import { SearchIcon } from "@/assets/icon";
import { IAuthor } from "@/types";
import contentful_client from "@/lib/contentful/client";
import Image from "next/image";
import Link from "next/link";

interface PropsT {
  authors: IAuthor[];
}

const Authors = ({ authors }: PropsT) => {
  console.log(authors[0]);
  return (
    <div className="relative">
      <div className="w-full bg-neutral-200 ">
        <div className="flex flex-col h-full items-center  justify-center py-10 gap-4 px-10 ">
          <div className="flex gap-2 justify-center items-center w-full sm:flex-row flex-col ">
            <div className="flex gap-2 h-12 w-full sm:w-6/12 bg-white items-center shadow-md px-3">
              <SearchIcon className="w-6 h-6" />
              <input
                type="text"
                className=" border-none outline-0 text-black bg-transparent w-full"
                placeholder="Search Authors"
              />
            </div>
            <button className="bg-orange-500 h-12 p-3 text-white w-28">
              Search
            </button>
          </div>
        </div>
      </div>
      <ContentContainer className="relative flex justify-center flex-col p-0">
        <div className="md:col-span-7 col-span-10 gap-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(3,minmax(300px,1fr))]">
          {authors.map((author: IAuthor) => (
            <Link
              href={{
                pathname: "/authors/[author]",
                query: { author: author.fields.slug },
              }}
              className="relative pt-16"
            >
              <div
                key={author.sys.id}
                className="rounded-full border-solid border-4 border-neutral-400 h-32 w-32 overflow-hidden absolute top-0 left-1/2 -translate-x-1/2"
              >
                <Image
                  alt={author.fields.picture.fields.title}
                  src={"https:" + author.fields.picture.fields.file.url}
                  height={128}
                  width={128}
                />
              </div>
              <div className="p-4 pt-16 border border-gray-200 shadow-gray-200 shadow-md bg-white">
                <h4 className="text-2xl font-medium text-center">
                  {author.fields.name}
                </h4>
                <p className="text-sm text-neutral-500 text-center">
                  {author.fields.role}
                </p>
                <p className="text-sm text-neutral-400 text-center mt-2">
                  About Me
                </p>
                <p className="text-base text-neutral-600 text-center">
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

export const getStaticProps = async () => {
  const response = await contentful_client.getEntries({
    content_type: "author",
  });

  return {
    props: {
      authors: response.items,
    },
  };
};

export default Authors;
