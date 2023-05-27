import React from 'react'
import Card from '../Card'

const AllPosts = () => {
    return (
        <div className=" bg-neutral-100 ">
            <div className="max-w-7xl md:max-w-5xl mx-auto py-10 sm:px-6 px-2">
                <span className="flex gap-1 flex-col">
                    <h2 className="font-bold text-4xl ">All Post</h2>
                    <hr className="w-24 h-[4px]   border-1 rounded bg-orange-700" />

                </span>
                <div className='grid-cols-10 grid py-10 gap-2'>
                    <div className="md:col-span-7 col-span-10 sm:gap-0 gap-6  grid place-items-center   grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                        {Array(4).fill(<Card
                            imageUrl="https://media.cnn.com/api/v1/images/stellar/prod/allbirds-sneakers-review-wool-runnerjpg.jpg?q=h_1090,w_1938,x_0,y_0"
                            altText="shoes"
                            title="Top 10 beautiful Place in Bangladesh"
                            description="Nulla et commodo turpis. Etiam hendrerit ornare pharetra."
                            date="March 25, 2021"

                            width="sm"
                        />
                        )}
                    </div>
                    <div className='sm:col-span-3 col-span-10 flex gap-2 flex-col'>
                        <div className='gap-2 flex flex-col sm:px-0 px-4 '>
                            <h2 className='text-xl font-bold'>Featured Category</h2>
                            <div className='w-full bg-[#C4C4C4] h-16'>
                                <button className='w-20 bg-white mx-5 font-medium my-3 h-10'>Travel</button>
                            </div>
                            <div className='w-full bg-[#C4C4C4] h-16'>
                                <button className='w-20 bg-white mx-5 font-medium my-3 h-10'>Food</button>
                            </div>
                            <div className='w-full bg-[#C4C4C4] h-16'>
                                <button className='w-20 bg-white mx-5 font-medium my-3 h-10'>LifeStyle</button>
                            </div>
                        </div>
                        <div >
                            <h2 className='text-xl font-bold'>All Tags</h2>
                            <div className='flex gap-2 flex-wrap my-3'>
                                <span className='tag-span'>Journey</span>
                                <span className='tag-span'>Life</span>
                                <span className='tag-span'>Food</span>
                                <span className='tag-span'>Fashion</span>
                                <span className='tag-span'>Interior</span>
                                <span className='tag-span'>Minimalistic</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AllPosts