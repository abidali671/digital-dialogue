import React from "react";
import CardContent from "../CardContent";
const RecentPost = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-10 mx-auto py-10 sm:px-6 px-2">
        <span className="flex r gap-1 flex-col">
          <h2 className="font-bold text-4xl ">Recent Post</h2>
          <hr className="w-24 h-[4px]   border-1 rounded bg-orange-700" />
        </span>

        <div className="py-12  grid place-items-center gap-3 gap-y-5  grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {Array(3).fill(<CardContent />)}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
