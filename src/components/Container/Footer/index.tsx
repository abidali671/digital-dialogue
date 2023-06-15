import ContentContainer from "@/components/ContentContainer";
import Link from "next/link";
import React from "react";
import Logo from "../../../assets/icon/logo";

const Footer = () => {
  return (
    <footer className="bg-[#272343] ">
      <ContentContainer className="pt-20 flex flex-col gap-6 absolute right-0 left-0 bottom-0">
        <div className="grid gap-y-5  place-content-start pb-4 mx-auto px-4 grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          <div className="flex  flex-col gap-5 items-start justify-start">
            <Logo className="h-12 w-auto stroke-white" />
            <p className="text-gray-400 text-md leading-6 ">
              Welcome to Digital Dialogue, your go-to blogging site for all
              things freelancing, technology, design and creativity.
            </p>
          </div>

          <FooterLink
            title="Category"
            links={["Technology", "Freelancing", "Design and Creativity"]}
          />
          <FooterLink
            title="Follow us"
            links={["Technology", "Freelancing", "Design and Creativity"]}
          />
          <div className="flex flex-col gap-3 w-full md:col-span-2  lg:col-span-1 ">
            <h3 className="text-2xl pt-3 text-white ">Newsletter</h3>
            <div className="flex gap-2 h-12 ">
              <input
                type="text"
                className="bg-white/10 px-3 w-full border-none outline-0 text-white "
                placeholder="Enter Email"
              />
              <button className="bg-orange-500 p-3 text-white">
                Subscribe
              </button>
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
  title: string;
  links: string[];
}
const FooterLink = ({ title, links }: FooterLinkPropsT) => {
  return (
    <div className="flex gap-3  flex-col">
      <h3 className="text-2xl pt-3 text-white">{title}</h3>
      <ul className="flex-col flex text-white gap-2">
        {links.map((link, index) => (
          <li key={index} className="hover:text-white text-gray-400">
            <Link className="text-gray-400" href="">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
