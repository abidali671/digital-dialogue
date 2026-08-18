"use client";

import React from "react";
import Link from "next/link";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";

interface IMenuProps {
  list: { label: string; href: string }[];
  button: ({ open }: { open: boolean }) => JSX.Element;
  buttonLabel: string;
}

const Menu = ({ list, button, buttonLabel }: IMenuProps) => {
  return (
    <HeadlessMenu as="div" className="relative">
      <HeadlessMenu.Button
        className="flex items-center gap-1"
        aria-label={buttonLabel}
      >
        {(state) => button(state)}
      </HeadlessMenu.Button>
      <Transition
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-150 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <HeadlessMenu.Items
          as="div"
          className="absolute right-0 top-[calc(100%_+_12px)] overflow-hidden rounded-lg border border-line bg-white"
        >
          {list.map((item) => (
            <HeadlessMenu.Item key={item.href}>
              {({ active }) => (
                <Link
                  href={item.href}
                  className={`block whitespace-nowrap px-4 py-3 text-sm font-semibold hover:bg-mist hover:text-accent ${
                    active ? "bg-mist text-accent" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </HeadlessMenu.Item>
          ))}
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
};

export default Menu;
