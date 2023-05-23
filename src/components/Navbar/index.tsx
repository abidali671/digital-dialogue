import React from "react";
import BlogyLogo from "../../assest/Blogy.png";
import SeachIcon from "../../assest/Search.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex justify-around  items-center h-16 ">
      <Image src={BlogyLogo} alt="Blogy logo" width={100} height={42} />
      <ul className="hidden gap-4 sm:flex">
        <li className="hover:border-b border-orange-500">
          <a href="">Home</a>
        </li>
        <li>
          <a href="">Travel</a>
        </li>

        <li>
          <a href="">Food</a>
        </li>
        <li>
          <a href="">Lifestyle</a>
        </li>
        <li>
          <a href="">Fashion</a>
        </li>

      </ul>
      <div className="flex gap-2 items-center">
        <Image
          src={SeachIcon}
          alt="search icon"
          className="w-[16px] h-[16px]"
        />
        <input
          type="text"
          className="focus:outline-none border-none "
          placeholder="search here..."
        />
      </div>
    </div>
  );
};

export default Navbar;
