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
        <Link href="/" className="inline-flex items-center" aria-label={config.SITE_NAME}>
          <Logo className="h-8 w-auto md:h-9" />
        </Link>
        <ul className="nav-list">
          {config.NAV_LINKS.slice(0, 3).map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          {categories && (
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
                      className={`h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </>
                )}
              />
            </li>
          )}
          {config.NAV_LINKS.slice(3).map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="mobile-nav-container">
          <Hamburger onClick={toggleMenu} className="cursor-pointer text-ink" />
          <Transition
            show={isMenu}
            className="fixed top-[64px] h-full w-full transition-all duration-500 ease-in-out"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
          >
            <div className="mobile-nav-menu">
              <ul className="nav-list">
                {config.NAV_LINKS.map((item) => (
                  <li key={item.href} onClick={toggleMenu} className="m-0">
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                <li className="m-0 border-y border-line px-6 py-4 font-mono text-xs uppercase tracking-[0.12em] text-mute">
                  Categories
                </li>
                {categories?.map((category) => (
                  <li
                    onClick={toggleMenu}
                    key={category.fields.slug}
                    className="m-0"
                  >
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
