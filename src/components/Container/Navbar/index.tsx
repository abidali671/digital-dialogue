"use client";

import React, { useState } from "react";
import { Transition } from "@headlessui/react";

import Link from "next/link";
import Image from "next/image";
import Hamburger from "@/assets/icon/Hamburger";
import ContentContainer from "../../ContentContainer";
import config from "@/lib/config";

const MOBILE_NAV_ID = "mobile-navigation";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);

  const toggleMenu = () => setIsMenu(!isMenu);

  return (
    <div className="navbar-root">
      <ContentContainer className="content-wrapper">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label={config.SITE_NAME}
        >
          <Image
            src="/logo.webp"
            alt={config.SITE_NAME}
            width={200}
            height={39}
            className="h-8 w-auto md:h-9"
            priority
          />
        </Link>
        <ul className="nav-list">
          {config.NAV_LINKS.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="mobile-nav-container">
          <button
            type="button"
            className="cursor-pointer text-ink"
            aria-label={isMenu ? "Close menu" : "Open menu"}
            aria-expanded={isMenu}
            aria-controls={MOBILE_NAV_ID}
            onClick={toggleMenu}
          >
            <Hamburger aria-hidden="true" />
          </button>
          <Transition
            show={isMenu}
            className="fixed left-0 top-[56px] bg-white w-full transition-all duration-500 ease-in-out"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
          >
            <div id={MOBILE_NAV_ID} className="mobile-nav-menu">
              <ul className="nav-list">
                {config.NAV_LINKS.map((item) => (
                  <li key={item.href} onClick={toggleMenu} className="m-0">
                    <Link href={item.href}>{item.label}</Link>
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
