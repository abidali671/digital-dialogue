import React from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";

interface IMenuProps {
  list: { label: string; onClick: () => void }[];
  button: ({ open }: { open: boolean }) => JSX.Element;
}

const Menu = ({ list, button }: IMenuProps) => {
  return (
    <HeadlessMenu as="div" className="relative">
      <HeadlessMenu.Button className="flex items-center gap-1">
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
          className="absolute right-0 top-[calc(100%_+_16px)] bg-white rounded shadow-md border "
        >
          {list.map((item, index) => (
            <a key={index}>
              <HeadlessMenu.Item
                as="div"
                onClick={item.onClick}
                className="p-3 cursor-pointer whitespace-nowrap hover:bg-neutral-100"
              >
                {item.label}
              </HeadlessMenu.Item>
            </a>
          ))}
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
};

export default Menu;
