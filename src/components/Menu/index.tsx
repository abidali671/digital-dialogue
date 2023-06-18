import React from "react";
import { Menu as HeadlessMenu } from "@headlessui/react";

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
      <HeadlessMenu.Items
        as="div"
        className="absolute right-0 top-[calc(100%_+_16px)] bg-white rounded shadow-md border "
      >
        {list.map((item, index) => (
          <HeadlessMenu.Item
            key={index}
            as="div"
            onClick={item.onClick}
            className="p-3 cursor-pointer whitespace-nowrap hover:bg-neutral-300"
          >
            {item.label}
          </HeadlessMenu.Item>
        ))}
      </HeadlessMenu.Items>
    </HeadlessMenu>
  );
};

export default Menu;
