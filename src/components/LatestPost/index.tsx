import React from 'react'
import Card from '../Card'


const LatestPost = () => {
    return (
        <div className='bg-gray-200 '>
            <div className='w-[90%] mx-auto py-10 bg-gray-200 '>
                <h2 className='font-bold text-4xl'>Latest Post</h2>
                <div className='flex flex-wrap justify-center gap-4 py-10'>
                    {Array(5).fill(<Card />)}
                </div>

            </div>
        </div>
    )
}
export default LatestPost