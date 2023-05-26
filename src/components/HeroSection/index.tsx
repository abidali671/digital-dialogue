import Image from "next/image";
import React from "react";
import BlogImage from "../../assest/BlogImage.png";

const Hero = () => {
  return (
    <div className="flex justify-center sm:h-[calc(100vh_-_64px)] h-[calc(100vh_-_400px)] overflow-hidden">
      <div className="w-[40%] relative bg-gray-50 md:block  hidden"></div>
      <div className="w-[60%]">
        <Image
          src={BlogImage}
          alt="Blogy logo"
          className="w-[100%] h-[100%] md:block  hidden "
        />
      </div>
      <div className="flex h-full items-center ">
        <div className="bg-white absolute  md:w-[50%]  w-[100%]  sm:text-left text-center sm:items-start items-center left-0 md:left-24  p-6 flex flex-col gap-2">
          <span className="flex items-center gap-1 ">
            <hr className="w-10 h-[2px]   border-0 rounded bg-orange-700" />
            <p>Interior</p>
          </span>
          <h2 className="text-4xl md:text-5xl font-bold  ">
            How to Get Started With Interior Design
          </h2>
          <p className="text-gray-500 flex items-center gap-2 text-[12px] lg:text-[16px]">
            March 25, 2021
            <span className="h-[5px] w-[5px] bg-gray-500 rounded-lg"></span>4
            min read
          </p>
          <p className="text-gray-500 text-[12px] lg:text-[16px]">
            Nulla et commodo turpis. Etiam hendrerit ornare pharetra. Cras
            eleifend purus vitae lorem venenatis bibendum. Sed commodo mi quis
            augue finibus, ut feugiat erat aliquam.
          </p>

          <button className="p-2 bg-orange-500 rounded-sm w-[130px] text-white">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
