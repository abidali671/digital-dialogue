import Image from "next/image";
import React, { useEffect, useState } from "react";
import BlogImage from "../../assest/BlogImage.png";
import { slideContent, slideContentPropsT } from "./heroContent";
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [content, setContent] = useState<slideContentPropsT>()

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideContent.length - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setContent(slideContent[currentSlide])
  }, [currentSlide])


  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === slideContent.length - 1 ? 0 : currentSlide + 1);
  };
  return (
    <div className="flex relative justify-center h-[max(calc(100vh_-_64px),50vh)] overflow-hidden">
      <div className="w-[40%] relative sm:bg-gray-50  ">
        <div className="flex absolute bottom-5 left-[18%] items-center gap-3">
          {/* content slider */}
          <div onClick={handlePrevSlide} className="p-2 rounded-full text-center cursor-pointer bg-white shadow-md text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <div className="flex gap-1">
            {slideContent.map(((item, ind) => (
              <span key={item.id} className={`h-2 w-2 rounded-full ${item.id == content?.id ? 'bg-orange-200' : ' bg-orange-400'}`}></span>
            )))}

          </div>
          <div onClick={handleNextSlide} className="p-2 rounded-full text-center cursor-pointer bg-white shadow-md text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          {/* content slider end*/}
        </div>
      </div>
      <div className="w-[60%]">
        <Image
          src={BlogImage}
          alt="Blogy logo"
          className="w-[100%] h-[100%] md:block  hidden "
        />
      </div>
      <div className="flex h-full items-center">
        <div key={content?.id} className="bg-white absolute  md:w-[50%]  w-[100%]  sm:text-left text-center sm:items-start items-center left-0 md:left-24  p-6 flex flex-col gap-2">
          <span className="flex items-center gap-1 ">
            <hr className="w-10 h-[2px]   border-0 rounded bg-orange-700" />
            <p>{content?.tag}</p>
          </span>
          <h2 className="text-4xl md:text-5xl font-bold  ">
            {content?.title}
          </h2>
          <p className="text-gray-500 flex items-center gap-2 text-[12px] lg:text-[16px]">
            {content?.date}
            <span className="h-[5px] w-[5px] bg-gray-500 rounded-lg"></span> 4  min read
          </p>
          <p className="text-gray-500 text-[12px] lg:text-[16px]">
            {content?.description}
          </p>
          <button onClick={() => console.log(content?.id)} className="p-2 bg-orange-500 rounded-sm w-[130px] text-white">
            Read More
          </button>
        </div>
      </div>



    </div>
  );
};

export default Hero;
