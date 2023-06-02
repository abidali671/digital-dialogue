import React from "react";
import Card from "../Card";
import ContentContainer from "../ContentContainer";
import { slideContent } from "../HeroSection/heroContent";

const LatestPost = () => {
  return (
    <div className=" bg-neutral-50 ">
      <div className="">
        <ContentContainer>
          <span className="flex r gap-1 flex-col">
            <h2 className="font-bold text-4xl ">Latest Post</h2>
            <hr className="w-24 h-[4px]   border-1 rounded bg-orange-700" />
          </span>
          <div className="py-10  grid place-items-center gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {slideContent.map((item) => (
              <Card
                key={item.id}
                imageUrl="https://freepngimg.com/thumb/shoes/27428-5-nike-shoes-transparent-background-thumb.png"
                altText="shoes"
                title={item.title}
                description={item.description.substring(0, 40)}
                date={item.date}
                id={item.id}
              />
            ))}
          </div>
        </ContentContainer>
      </div>
    </div>
  );
};
export default LatestPost;
