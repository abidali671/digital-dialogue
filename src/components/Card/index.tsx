import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReadingTime } from '../../hooks/readingTime'

interface CardPropsT {
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
  date: string;
  width: string
}

export interface customizeWidthPropsT {
  [key: string]: any;
}
const Card = ({ imageUrl, altText, title, description, date, width }: CardPropsT) => {
  const readingTime = useReadingTime(description); //reading hook

  const customizeWidth: customizeWidthPropsT = { // props based customize width
    'sm': 'max-w-xs',
    'md': 'max-w-md',
  }

  return (
    <div className={`${customizeWidth[width]}`}>
      {imageUrl && <div className="relative h-[240px] min-w-full object-contain">
        <Image src={imageUrl} alt={altText} fill />
      </div>}

      <div className="p-4 gap-1 flex flex-col text-left items-start border border-gray-200 shadow-gray-200 shadow-md border-t-0 bg-white sm:relative sm:w-[95%] sm:top-[-20px]">
        <span className="flex items-center gap-1">
          <hr className="w-10 h-[2px] border-0 rounded bg-orange-700" />
          <p>Interior</p>
        </span>
        <Link href="#">
          <h5 className="text-[28px] font-bold tracking-tight text-gray-900 leading-[32px] font-PT">
            {title}
          </h5>
        </Link>

        <p className="text-gray-500 text-[12px] lg:text-[16px]">{description && description}</p>
        <p className="text-gray-500 flex items-center gap-2 text-[12px] lg:text-[16px]">
          {date}
          <span className="h-[5px] w-[5px] bg-gray-500 rounded-lg"></span> {readingTime} min read
        </p>

        <Link
          href="#"
          className="pt-2 inline-flex items-center text-md font-medium text-center text-black"
        >
          Read Article
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;