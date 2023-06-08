import React from "react";
import SeachIcon from "../../../assest/Search.png";
import Logo from "../../../assest/icon/logo";
import Image from "next/image";
import Link from "next/link";
import ContentContainer from "../../ContentContainer";

const Navbar = () => {
  return (
    <div className="container-root">
      <ContentContainer className="content-wrapper">
        <Link href="/">
          <Logo />
        </Link>
        <ul className="nav-list">
          <li>
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
            <div className="search-box">
              <Image src={SeachIcon} alt="search icon" />
              <input type="text" placeholder="search here..." />
            </div>
          </li>
        </ul>
      </ContentContainer>
    </div>
  );
};

export default Navbar;
