import ContentContainer from "@/components/ContentContainer";
import Link from "next/link";
import React from "react";
import Logo from "../../../assest/icon/logo";

const Footer = () => {
  return (
    <footer className="bg-[#272343]">
      <ContentContainer className="py-20">
        <div className="grid gap-y-5 place-items-start gap-x-8 md:gap-x-0 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          <div className="flex   flex-col gap-5 items-start justify-start">
            <Logo fill="red" stroke="white" />
            <p className="text-gray-400 text-md leading-6 ">
              Phasellus porttitor sapien a purus venenatis condimentum. Nunc
              lectus ipsum, laoreet ut efficitur.
            </p>
          </div>

          <FooterLink
            title="Category"
            links={["Travel", "Food", "LifeStyle", "Fashion"]}
          />
          <FooterLink
            title="Follow us"
            links={["Travel", "Food", "LifeStyle", "Fashion"]}
          />
          <div className="flex flex-col gap-3 w-full ">
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
    <div className="flex gap-3 grid flex-col">
      <h3 className="text-2xl pt-3 text-white">{title}</h3>
      <ul className="flex-col flex text-white gap-2">
        {links.map((link) => (
          <li className="hover:text-white text-gray-400">
            <Link href="">{link}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
