import React from "react";
import Card from "../Card";

const LatestPost = () => {
    return (
        <div className="bg-gray-200 ">
            <div className="max-w-7xl md:max-w-5xl mx-auto py-10 bg-gray-200 sm:px-6 px-2">
                <span className="flex r gap-1 flex-col">
                    <h2 className="font-bold text-4xl ">Latest Post</h2>
                    <hr className="w-24 h-[4px]   border-1 rounded bg-orange-700" />
                </span>
                <div className="py-10  grid place-items-center gap-6   grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                    {Array(6).fill(<Card
                        imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
                        altText="shoes"
                        title="Top 10 beautiful Place in Bangladesh"
                        description="Nulla et commodo turpis. Etiam hendrerit ornare pharetra."
                        date="March 25, 2021"

                        width="sm"
                    />
                    )}
                </div>
            </div>
        </div>
    );
};
export default LatestPost;
