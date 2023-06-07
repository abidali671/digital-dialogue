import React from "react";
import { Card, ContentContainer } from "@/components";
import { SearchIcon } from "@/assest/icon";

const Blogs = () => {
  return (
    <div className="relative">
      <div className="h-[50vh] w-full bg-neutral-200 ">
        <div className="flex flex-col h-full items-center  justify-center pt-10 gap-4 px-10 ">
          <h3 className="sm:text-[40px] text-3xl text-center font-bold">
            ‘Travel’ here’s what we’ve got
          </h3>

          <div className="flex gap-2 justify-center items-center w-full sm:flex-row flex-col ">
            <div className="flex gap-2 h-12   w-full sm:w-6/12 bg-white items-center shadow-md px-3">
              <SearchIcon />
              <input
                type="text"
                className=" border-none outline-0 text-black bg-transparent w-full"
                placeholder="Travel"
              />
            </div>
            <button className="bg-orange-500 p-3 text-white w-28">
              Search
            </button>
          </div>
        </div>
      </div>
      <ContentContainer className="relative flex justify-center flex-col p-0">
        <div className="py-10 grid place-items-center gap-4  w-full sm:w-[70%] mx-auto grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
          <Card
            imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
            altText="shoes"
            title="How to Get Started With UI/UX in Figma"
            description=""
            date="March 25, 2021"
          />
          <Card
            imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
            altText="shoes"
            title="How to Get Started With UI/UX in Figma"
            description=""
            date="March 25, 2021"
          />
          <Card
            imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
            altText="shoes"
            title="How to Get Started With UI/UX in Figma"
            description=""
            date="March 25, 2021"
          />
          <Card
            imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
            altText="shoes"
            title="How to Get Started With UI/UX in Figma"
            description=""
            date="March 25, 2021"
          />
        </div>
      </ContentContainer>
    </div>
  );
};

export default Blogs;
