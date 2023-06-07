import React from "react";
import SeachIcon from "../../../assest/Search.png";
import Logo from "../../../assest/icon/logo";
import Image from "next/image";
import Link from "next/link";
import ContentContainer from "../../ContentContainer";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 shadow-lg bg-white">
      <ContentContainer className="flex items-center justify-between h-16 relative">
        <Link href="/">
          <Logo />
        </Link>
        <ul className="hidden gap-4 sm:flex">
          <li className="hover:border-orange-600 border-transparent border-b-2">
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="">Blogs</Link>
          </li>

          <li>
            <Link href="">Categories</Link>
          </li>
          <li>
            <Link href="">Author</Link>
          </li>
          <li>
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
          </li>
        </ul>
      </ContentContainer>
    </div>
  );
};

export default Navbar;
