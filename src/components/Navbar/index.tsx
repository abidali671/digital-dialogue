import React from "react";
import BlogyLogo from "../../assest/Blogy.png";
import SeachIcon from "../../assest/Search.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex justify-around  items-center h-20">
      <Image src={BlogyLogo} alt="Blogy logo" width={100} height={42} />
      <ul className="flex gap-4">
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
        <li className="bg-gray-430 h-20">
          <div className="flex flex-1">
            <Image src={SeachIcon} alt="search icon" width={20} height={20} />
            <input type="text" placeholder="search here" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
