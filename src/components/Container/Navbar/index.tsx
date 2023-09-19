import React, { useState } from "react";
import { useRouter } from "next/router";
import { ICategoryData } from "@/types";
import { Transition } from "@headlessui/react";

import Link from "next/link";
import ChevronDown from "@/assets/icon/ChevronDown";
import Menu from "@/components/Menu";
import Hamburger from "@/assets/icon/Hamburger";
import ContentContainer from "../../ContentContainer";
import Logo from "../../../assets/icon/logo";
import config from "@/lib/config";

interface INavbarProps {
  categories: ICategoryData[];
}

const Navbar = ({ categories }: INavbarProps) => {
  const [isMenu, setIsMenu] = useState(false);
  const router = useRouter();

  const handleClickMenu = (slug: string) => {
    router.push({ pathname: "/blogs/[category]", query: { category: slug } });
  };

  const toggleMenu = () => setIsMenu(!isMenu);

  return (
    <div className="navbar-root">
      <ContentContainer className="content-wrapper">
        <Link href="/">
          <Logo className="md:h-9 h-8 w-auto" aria-label="website logo" />
        </Link>
        <ul className="nav-list">
          {config.NAV_LINKS.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          {/* {categories && (
            <li>
              <Menu
                list={categories?.map((category) => ({
                  label: category.fields.label,
                  onClick: () => handleClickMenu(category.fields.slug),
                }))}
                button={({ open }) => (
                  <>
                    Categories
                    <ChevronDown
                      className={`h-4 w-4 transition-all ${
                        open && "rotate-180"
                      }`}
                    />
                  </>
                )}
              />
            </li>
          )} */}
        </ul>
        <div className="mobile-nav-container">
          <Hamburger onClick={toggleMenu} className="cursor-pointer" />
          <Transition
            show={isMenu}
            className="fixed transition-all duration-700 top-[64px] w-full h-full ease-in-out"
            enterFrom="opacity-0 right-full"
            enterTo="opacity-100 right-0"
            leaveFrom="opacity-100 right-0"
            leaveTo="opacity-0 right-full"
          >
            <div className="mobile-nav-menu">
              <ul className="nav-list">
                {config.NAV_LINKS.map((item, index) => (
                  <li key={index} onClick={toggleMenu}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                <hr />
                <hr />
                <li className="border-t-2 border-b-2 border-gray-100 mt-6 p-6">
                  Categories
                </li>
                {categories &&
                  categories?.map((category, index) => (
                    <li onClick={toggleMenu} key={index}>
                      <Link
                        href={{
                          pathname: "/blogs/[category]",
                          query: { category: category.fields.slug },
                        }}
                      >
                        {category.fields.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </Transition>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Navbar;
