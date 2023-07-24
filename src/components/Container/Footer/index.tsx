import ContentContainer from "@/components/ContentContainer";
import Link from "next/link";
import React from "react";
import Logo from "../../../assets/icon/logo";
import config from "@/lib/config";
import { ICategoryData } from "@/types";

type IFooterProps = { categories?: ICategoryData[] };

const Footer = ({ categories }: IFooterProps) => {
  return (
    <footer className="bg-[#272343] ">
      <ContentContainer className="pt-20 flex flex-col gap-6 absolute right-0 left-0 bottom-0">
        <div className="grid gap-y-5  place-content-start pb-4 mx-auto px-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-5  gap-4">
          <div className="flex  flex-col gap-5 items-start justify-start md:col-span-3 lg:col-span-2">
            <Logo className="h-12 w-auto stroke-white" />
            <p className="text-gray-400 text-md leading-6 max-w-md">
              Welcome to Digital Dialogue, your go-to blogging site for all
              things freelancing, technology, design and creativity.
            </p>
          </div>
          {categories && (
            <FooterLink
              title="Categories"
              links={categories?.map((category) => ({
                label: category.fields.label,
                href: "/blogs/" + category.fields.slug,
              }))}
            />
          )}
          <FooterLink title="Pages" links={config.FOOTER_LINKS} />
          <div className="flex flex-col gap-3 w-full">
            <h3 className="text-2xl pt-3 text-white ">Contact Info</h3>
            <div>
              <p className="text-gray-400 text-base whitespace-nowrap">
                Email: abid.saeed.ali92@gmail.com
              </p>
              <p className="text-gray-400 text-base whitespace-nowrap">
                Phone: +92 3248218854
              </p>
            </div>
          </div>
        </div>
        <hr className=" border-1 border-[#7F7F7F]" />
        <div className="text-white flex justify-between items-center">
          <p className="text-base">
            © 2023 Digital-Dialogue.com - All rights reserved
          </p>
          <p className="text-base">Develop by team Digital Dialogue</p>
        </div>
      </ContentContainer>
    </footer>
  );
};

export default Footer;

interface FooterLinkPropsT {
  title?: string;
  links: { label: string; href: string }[];
}
const FooterLink = ({ title, links }: FooterLinkPropsT) => {
  return (
    <div className="flex gap-3  flex-col">
      <h3 className="text-2xl pt-3 text-white h-11">{title || " "}</h3>
      <ul className="flex-col flex text-white gap-2 m-0">
        {links.map((link, index) => (
          <li key={index} className="hover:text-white text-gray-400 list-none">
            <Link className="text-gray-400" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
