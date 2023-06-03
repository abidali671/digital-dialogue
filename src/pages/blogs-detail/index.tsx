import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogDetail = () => {
    return (
        <React.Fragment>
            <div className="h-[70vh] w-full bg-neutral-300 relative">
            </div>
            <div className="p-7 gap-3 flex w-11/12  md:w-6/12 flex-col text-left items-start border border-gray-200 shadow-gray-200 shadow-sm border-t-0 bg-white relative bottom-32 md:mx-0 mx-auto left-0 md:left-20">
                <span className="flex items-center gap-1">
                    <hr className="w-10 h-[2px] border-0 rounded bg-orange-700" />
                    <p>Interior</p>
                </span>
                <h5 className="md:text-[52px] text-[42px] font-bold tracking-tight text-gray-900 leading-[48px] font-PT">
                    20 essential skills for successful web designers
                </h5>
                <div className='flex items-center gap-5 pt-3'>
                    <div className='flex gap-2 items-center'>
                        <span className="h-7 w-7 bg-gray-200 rounded-xl" />
                        <p className='font-medium'>Kadin Dias</p>
                    </div>
                    <span className="flex h-[5px] w-[5px] bg-gray-500 rounded-lg"></span>
                    <p className="text-gray-500 flex items-center gap-2 text-[12px] lg:text-[16px]">
                        March 25, 2021
                    </p>
                    <span className="h-[5px] w-[5px] bg-gray-500 rounded-lg"></span>
                    <p className="text-gray-500 flex items-center gap-2 text-[12px] lg:text-[16px]">
                        4 min read
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogDetail