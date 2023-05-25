import React from "react";
import Card from "../Card";

const LatestPost = () => {
  return (
    <div className="bg-gray-200 ">
      <div className="max-w-7xl mx-auto py-10 bg-gray-200 sm:px-6 px-2">
        <span className="flex r gap-1 flex-col">
          <h2 className="font-bold text-4xl ">Latest Post</h2>
          <hr className="w-24 h-[4px]   border-1 rounded bg-orange-700" />
        </span>
        <div className="py-10  grid place-items-center gap-6   grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {Array(6).fill(<Card />)}
        </div>
      </div>
    </div>
  );
};
export default LatestPost;
