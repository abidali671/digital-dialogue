import React from "react";
import Logo from "../../../assets/icon/logo";
import Link from "next/link";
import ContentContainer from "../../ContentContainer";

const Navbar = () => {
  return (
    <div className="container-root">
      <ContentContainer className="content-wrapper">
        <Link href="/">
          <Logo className="md:h-12 h-10 w-auto" />
        </Link>
        <ul className="nav-list">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
          {/* <li>
            <Link href="">Categories</Link>
          </li> */}
          <li>
            <Link href="/authors">Authors</Link>
          </li>
        </ul>
      </ContentContainer>
    </div>
  );
};

export default Navbar;
