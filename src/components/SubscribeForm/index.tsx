import React from "react";

const SubscribeForm = () => {
  return (
    <div className="w-8/12 md:w-[500px] mx-auto my-20   relative">
      <div className="flex justify-center items-center ">
        <div className="rounded-full h-16 w-16 bg-[#3C3EDE] p-3  absolute -top-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-[2px] p-10  text-center shadow-xl">
        <h2 className="  text-center">Subscribe To Updates</h2>
        <p className="text-gray-400 text-md">
          Get the latest blogs from Digital Dialogue
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Your Email Address"
            className="h-12 border-[2px] outline-none text-center "
          />
          <button className="bg-[#3C3EDE] text-white h-12 border-none outline-none font-bold">
            SUBSCRIBE
          </button>
        </div>
        <p className="text-gray-400 text-sm">
          <input type="checkbox" name="" id="" /> By signing you agree to the
          our terms and our Privacy Policy agreement
        </p>
      </div>
    </div>
  );
};

export default SubscribeForm;
