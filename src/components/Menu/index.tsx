import React from "react";
import { Menu as HeadlessMenu, MenuButtonProps } from "@headlessui/react";

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
      <HeadlessMenu.Items as="div" className="absolute right-0 top-full">
        {list.map((item) => (
          <HeadlessMenu.Item as="div" onClick={item.onClick}>
            {item.label}
          </HeadlessMenu.Item>
        ))}
      </HeadlessMenu.Items>
    </HeadlessMenu>
  );
};

export default Menu;
