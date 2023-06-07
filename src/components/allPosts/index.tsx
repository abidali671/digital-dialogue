import Categories from "@/constants/categories";
import Tags from "@/constants/tags";
import React from "react";
import Card from "../Card";
import Category from "../Category";
import ContentContainer from "../ContentContainer";
import Tag from "../Tag";

const AllPosts = () => {
  return (
    <div className="bg-neutral-100">
      <ContentContainer>
        <span className="flex gap-1 flex-col">
          <h2 className="font-bold text-4xl ">All Post</h2>
          <hr className="w-24 h-[4px]   border-1 rounded bg-orange-700" />
        </span>
        <div className="grid-cols-10 grid py-10 gap-6">
          <div className="md:col-span-7 col-span-10 gap-6  grid place-items-center   grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            <Card
              imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
              altText="shoes"
              title="Top 10 beautiful Place in Bangladesh"
              description="Nulla et commodo turpis. Etiam hendrerit ornare pharetra."
              date="March 25, 2021"
            />
            <Card
              imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
              altText="shoes"
              title="Top 10 beautiful Place in Bangladesh"
              description="Nulla et commodo turpis. Etiam hendrerit ornare pharetra."
              date="March 25, 2021"
            />
            <Card
              imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
              altText="shoes"
              title="Top 10 beautiful Place in Bangladesh"
              description="Nulla et commodo turpis. Etiam hendrerit ornare pharetra."
              date="March 25, 2021"
            />
            <Card
              imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
              altText="shoes"
              title="Top 10 beautiful Place in Bangladesh"
              description="Nulla et commodo turpis. Etiam hendrerit ornare pharetra."
              date="March 25, 2021"
            />
          </div>
          <div className="sm:col-span-3 hidden md:flex gap-2 flex-col">
            <div className="gap-2 flex flex-col sm:px-0 px-4 ">
              <h2 className="text-xl font-bold">Featured Category</h2>
              {Categories.map(({ label, slug }, ind) => (
                <Category key={ind} label={label} slug={slug} />
              ))}
            </div>
            <div>
              <h2 className="text-xl font-bold">All Tags</h2>
              <div className="flex gap-2 flex-wrap my-3">
                {Tags.map((tag, ind) => (
                  <Tag key={ind} label={tag.label} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default AllPosts;
