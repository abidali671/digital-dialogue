import React from 'react'
import Card from '../Card'

const FeaturedSection = () => {
    return (
        <div className="bg-white ">
            <div className="max-w-7xl   mx-auto py-10 bg-white sm:px-6 px-2">
                <span className="flex r gap-1 flex-col">
                    <h2 className="font-bold text-4xl ">Featured Post</h2>
                    <hr className="w-24 h-[4px]   border-1 rounded bg-orange-700" />
                </span>
                <div className="py-10 flex flex-wrap gap-3 justify-center ">
                    {Array(2).fill(<Card
                        imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
                        altText="shoes"
                        title="How to Get Started With UI/UX in Figma"
                        description=""
                        date="March 25, 2021"
                        width="md"
                    />)}
                </div>
            </div>
        </div>
    )
}

export default FeaturedSection