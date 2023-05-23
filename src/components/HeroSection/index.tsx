import Image from "next/image";
import React from "react";
import BlogImage from "../../assest/BlogImage.png";

const Hero = () => {
  return (
    <div className="flex justify-center h-[calc(100vh_-_64px)] overflow-hidden">
      <div className="w-[40%] relative"></div>
      <div className="w-[60%]">
        <Image src={BlogImage} alt="Blogy logo" className="w-[100%] h-[100%]" />
      </div>
      <div>
        <div className="bg-gray-200 absolute w-[45%] left-24 top-48  p-10 flex flex-col gap-4">
          <span className="flex items-center gap-1">
            <hr className="w-10 h-[2px]  bg-gray-100 border-0 rounded bg-orange-700" />
            <p>Interior</p>
          </span>
          <h2 className="text-5xl font-bold font-serif leading-[57px]">
            How to Get Started With Interior Design
          </h2>
          <p className="text-gray-500 flex items-center gap-2">
            March 25, 2021{" "}
            <span className="h-[5px] w-[5px] bg-gray-500 rounded-lg"></span> 4
            min read
          </p>
          <p className="text-gray-500 ">
            Nulla et commodo turpis. Etiam hendrerit ornare pharetra. Cras
            eleifend purus vitae lorem venenatis bibendum. Sed commodo mi quis
            augue finibus, ut feugiat erat aliquam.
          </p>

          <button className="p-3 bg-orange-500 rounded-sm w-[140px] text-white">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
