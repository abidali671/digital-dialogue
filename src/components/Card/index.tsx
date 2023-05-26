import React from "react";
import BlogImage from "../../assest/BlogImage.png";
import Image from "next/image";
import Link from "next/link";

const Card = () => {
  return (
    <div className="max-w-sm">
      <div className="relative  h-[240px] object-contain">
        <Image
          src="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
          alt="shoes"
          fill
        />
      </div>

      <div className="p-4 gap-2 flex flex-col text-left items-start  border border-gray-200 shadow-gray-200 shadow-md border-t-0 bg-white sm:relative sm:w-[95%] sm:top-[-20px] ">
        <span className="flex items-center gap-1 ">
          <hr className="w-10 h-[2px]   border-0 rounded bg-orange-700" />
          <p>Interior</p>
        </span>
        <Link href="#">
          <h5 className=" text-[28px] font-bold tracking-tight text-gray-900 leading-[32px]  font-PT">
            Top 10 beautiful Place in Bangladesh
          </h5>
        </Link>

        <p className="text-gray-500 text-[12px] lg:text-[16px]">
          Nulla et commodo turpis. Etiam hendrerit ornare pharetra. Cras
          eleifend purus vitae lorem venenatis bibendum.
        </p>
        <p className="text-gray-500 flex items-center gap-2 text-[12px] lg:text-[16px]">
          March 25, 2021
          <span className="h-[5px] w-[5px] bg-gray-500 rounded-lg"></span> 4 min
          read
        </p>

        <Link
          href="#"
          className="pt-2 inline-flex items-center  text-sm font-medium text-center text-black "
        >
          Read more
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;
