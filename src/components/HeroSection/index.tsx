import { ArrowLeft, ArrowRight } from "@/assest/icon";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import BlogImage from "../../assest/BlogImage.png";
import ContentContainer from "../ContentContainer";
import { slideContent } from "./data";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const content = useMemo(() => slideContent[currentSlide], [currentSlide]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(
      currentSlide === 0 ? slideContent.length - 1 : currentSlide - 1
    );
  }, [currentSlide]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(
      currentSlide === slideContent.length - 1 ? 0 : currentSlide + 1
    );
  }, [currentSlide]);

  return (
    <div className="flex relative justify-center sm:h-[calc(100vh_-_64px)] h-[70vh] overflow-hidden">
      <div className="w-[40%] relative md: bg-neutral-50 bg-none"></div>
      <div className="w-[60%]">
        <Image
          src={BlogImage}
          alt="digital-dialogue-logo"
          className="w-[100%] h-[100%] md:block hidden "
        />
      </div>
      <ContentContainer className="!absolute top-0 lg:top-20 bottom-0 left-[50%]  sm:left-[55%] translate-x-[-50%]">
        <div className="absolute left-0 top-[50%] translate-y-[-50%] flex flex-col gap-10 max-w-[650px] width-[90%]">
          <div
            key={content?.id}
            className="bg-white z-0 shadow-none sm:shadow-lg w-[100%] sm:text-left text-center sm:items-start items-center p-6 flex flex-col gap-2"
          >
            <span className="flex items-center gap-1 ">
              <hr className="w-10 h-[2px]   border-0 rounded bg-orange-700" />
              <p>{content?.tag}</p>
            </span>
            <h2 className="text-4xl lg:text-5xl  font-bold  ">
              {content?.title}
            </h2>
            <p className="text-gray-500 flex items-center gap-2 text-[12px] lg:text-[16px]">
              {content?.date}
              <span className="h-[5px] w-[5px] bg-gray-500 rounded-lg"></span> 4
              min read
            </p>
            <p className="text-gray-500 text-[12px] lg:text-[16px]">
              {content?.description}
            </p>
            <button
              onClick={() => console.log(content?.id)}
              className="p-2 bg-orange-500 rounded-sm w-[100px]  lg:w-[130px] text-white"
            >
              Read More
            </button>
          </div>
          <SliderIndicator
            onPrevSlide={handlePrevSlide}
            onNextSlide={handleNextSlide}
            id={content?.id}
          />
        </div>
      </ContentContainer>
    </div>
  );
};

interface SliderIndicatorPropsT {
  onPrevSlide: React.MouseEventHandler<HTMLDivElement>;
  onNextSlide: React.MouseEventHandler<HTMLDivElement>;
  id: string;
}
const SliderIndicator = ({
  onPrevSlide,
  onNextSlide,
  id,
}: SliderIndicatorPropsT) => (
  <div className="flex items-center gap-3">
    <div
      onClick={onPrevSlide}
      className="p-2 rounded-full text-center cursor-pointer bg-white shadow-md text-black"
    >
      <ArrowLeft />
    </div>
    <div className="flex gap-1">
      {slideContent.map((item) => (
        <span
          key={item.id}
          className={`h-2 w-2 rounded-full ${
            item.id == id ? "bg-orange-200" : " bg-orange-400"
          }`}
        ></span>
      ))}
    </div>
    <div
      onClick={onNextSlide}
      className="p-2 rounded-full text-center cursor-pointer bg-white shadow-md text-black"
    >
      <ArrowRight />
    </div>
  </div>
);

export default Hero;
