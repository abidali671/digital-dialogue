"use client";

import React, { useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ContentContainer from "../../ContentContainer";
import config from "@/lib/config";

const MOBILE_NAV_ID = "mobile-navigation";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenu(!isMenu);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenu((open) => {
        if (open) {
          queueMicrotask(() => menuButtonRef.current?.focus());
        }
        return false;
      });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="navbar-root">
      <ContentContainer className="content-wrapper">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center"
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
        <nav aria-label="Main">
          <ul className="nav-list">
            {config.NAV_LINKS.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={current ? "is-current" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mobile-nav-container">
          <button
            ref={menuButtonRef}
            type="button"
            className="grid h-12 w-12 place-items-center rounded-lg text-ink hover:bg-mist"
            aria-label={isMenu ? "Close menu" : "Open menu"}
            aria-expanded={isMenu}
            aria-controls={MOBILE_NAV_ID}
            onClick={toggleMenu}
          >
            {isMenu ? (
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
          <Transition
            as="div"
            show={isMenu}
            className="fixed left-0 top-[64px] bg-white w-full transition-all duration-500 ease-in-out"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
          >
            <nav
              id={MOBILE_NAV_ID}
              aria-label="Main (mobile)"
              className="mobile-nav-menu"
            >
              <ul className="nav-list">
                {config.NAV_LINKS.map((item) => {
                  const current = isCurrent(item.href);
                  return (
                    <li key={item.href} onClick={toggleMenu} className="m-0">
                      <Link
                        href={item.href}
                        aria-current={current ? "page" : undefined}
                        className={current ? "is-current" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Transition>
        </div>
      </ContentContainer>
    </header>
  );
};

export default Navbar;
