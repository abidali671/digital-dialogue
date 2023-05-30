import ContentContainer from "@/components/ContentContainer";
import Link from "next/link";
import React from "react";
import Logo from "../../../assest/icon/logo";

const Footer = () => {
  return (
    <footer className="bg-blue-900">
      <ContentContainer className="py-20 ">
        <div className="grid gap-10 place-items-start grid-cols-1 sm:grid-cols-4 ">
          <div className="flex flex-col gap-5 items-start justify-start">
            <Logo />
            <p className="text-gray-200 text-md">
              Phasellus porttitor sapien a purus venenatis condimentum. Nunc
              lectus ipsum, laoreet ut efficitur.
            </p>
          </div>

          <div className="flex gap-3 flex-col">
            <h3 className="text-2xl text-white">Category</h3>
            <ul className="flex-col flex text-white gap-2">
              <li className="hover:border-b border-orange-500">
                <Link href="">Home</Link>
              </li>
              <li>
                <Link href="">Travel</Link>
              </li>

              <li>
                <Link href="">Food</Link>
              </li>
              <li>
                <Link href="">Lifestyle</Link>
              </li>
              <li>
                <Link href="">Fashion</Link>
              </li>
            </ul>
          </div>
          <div className="flex gap-3 flex-col">
            <h3 className="text-2xl text-white">Follow us</h3>
            <ul className="flex-col flex text-white gap-2">
              <li className="hover:border-b border-orange-500">
                <Link href="">Home</Link>
              </li>
              <li>
                <Link href="">Travel</Link>
              </li>

              <li>
                <Link href="">Food</Link>
              </li>
              <li>
                <Link href="">Lifestyle</Link>
              </li>
              <li>
                <Link href="">Fashion</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 ">
            <h3 className="text-2xl text-white">Newsletter</h3>
            <div className="flex  gap-2 h-12">
              <input
                type="text"
                className="bg-white/10 px-3"
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
