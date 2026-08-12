"use client";

import React from "react";
import { Arrow } from "@/assets/icon";
import cx from "clsx";

interface PropsT {
  pages: number;
  currentPage: number;
  onChange: (page_no: number) => void;
}

const Pagination = ({ pages, currentPage, onChange }: PropsT) => {
  return (
    <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
      <div className="flex w-full items-center justify-between border-t border-line">
        <div
          onClick={() => onChange(currentPage - 1)}
          className="flex cursor-pointer items-center pt-3 text-mute hover:text-accent"
        >
          <Arrow className="transform rotate-180" />
          <p className="text-sm ml-3 font-medium leading-none">Previous</p>
        </div>
        <div className="sm:flex hidden">
          {/* <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 px-2">
            1
          </p>
          <Dots /> */}
          <div className="flex gap-2 px-2">
            {Array(pages)
              .fill("")
              .map((_, index) => (
                <p
                  onClick={() => onChange(1 + index)}
                  key={index}
                  className={cx(
                    "cursor-pointer border-t border-transparent px-2 pt-3 text-sm font-medium leading-none text-mute hover:border-accent hover:text-accent",
                    1 + index === currentPage && "border-accent text-accent"
                  )}
                >
                  {1 + index}
                </p>
              ))}
          </div>
          {/* <Dots />
          <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 px-2">
            {pages}
          </p> */}
        </div>
        <div
          onClick={() => onChange(currentPage + 1)}
          className="flex cursor-pointer items-center pt-3 text-mute hover:text-accent"
        >
          <p className="text-sm font-medium leading-none mr-3">Next</p>
          <Arrow />
        </div>
      </div>
    </div>
  );
};

const Dots = () => (
  <div className="flex gap-1 pt-[18px]">
    <span className="h-1 w-1 rounded-full bg-gray-400" />
    <span className="h-1 w-1 rounded-full bg-gray-400" />
    <span className="h-1 w-1 rounded-full bg-gray-400" />
  </div>
);

export default Pagination;
