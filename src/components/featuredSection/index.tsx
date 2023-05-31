import React from "react";
import Card from "../Card";
import ContentContainer from "../ContentContainer";

const FeaturedSection = () => {
  return (
    <div className="bg-white ">
      <ContentContainer>
        <span>
          <h2 className="font-bold text-4xl ">Featured Post</h2>
          <hr className="w-24 h-[4px]   border-1 rounded bg-orange-700" />
        </span>
        <div className="py-10 grid place-items-center gap-4  w-full sm:w-[70%] mx-auto grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
          {Array(2).fill(
            <Card
              imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
              altText="shoes"
              title="How to Get Started With UI/UX in Figma"
              description=""
              date="March 25, 2021"
            />
          )}
        </div>
      </ContentContainer>
    </div>
  );
};

export default FeaturedSection;
