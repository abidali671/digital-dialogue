import ContentContainer from "@/components/ContentContainer";
import Link from "next/link";
import React from "react";
import Logo from "../../../assets/icon/logo";
import config from "@/lib/config";
import { ICategoryData } from "@/types";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import NewsletterForm from "@/components/SectionSubscribe";
type IFooterProps = { categories?: ICategoryData[] };

const Footer = ({ categories }: IFooterProps) => {
  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_KEY;
  console.log(MAILCHIMP_URL);

  return (
    <footer className="bg-[#272343] relative">
      <ContentContainer className="pt-10 flex flex-col gap-6 absolute right-0 left-0 bottom-0">
        <div className="grid gap-y-5  place-content-start pb-4 mx-auto px-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
          <div className="flex  flex-col gap-5 items-start justify-start md:col-span-1 lg:col-span-2">
            <Logo className="h-12 w-auto stroke-white" />
            <p className="text-gray-400 text-sm leading-6 max-w-md">
              Welcome to Digital Dialogue, your go-to blogging site for all
              things freelancing, technology, design and creativity.
            </p>
          </div>

          <FooterLink title="Pages" links={config.NAV_LINKS} />
          <div className="flex flex-col gap-3 w-full lg:col-span-2  ">
            <h3 className="text-lg  text-white ">Contact Info</h3>
            <div>
              <p className="text-gray-400 text-sm whitespace-nowrap">
                Email:{config.EMAIL}
              </p>
              <p className="text-gray-400 text-sm whitespace-nowrap">
                Phone: {config.PHONE}
              </p>
            </div>
          </div>
          <MailchimpSubscribe
            url={String(MAILCHIMP_URL)}
            render={(props: any) => {
              const { subscribe, status, message } = props || {};
              return (
                <NewsletterForm
                  status={status}
                  message={message}
                  onValidated={(formData: any) => subscribe(formData)}
                />
              );
            }}
          />
        </div>
        <hr className=" border-1 border-[#7F7F7F]" />
        <div className="flex justify-between items-center max-md:flex-col">
          <p className="text-base text-gray-200">
            © 2023 Digital-Dialogue.co - All rights reserved
          </p>
          <p className="text-base text-gray-200">
            Develop by team Digital Dialogue
          </p>
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
    <div className="flex gap-3  flex-col sm:col-span-1 col-span-2">
      <h3 className="text-lg   text-white  ">{title || " "}</h3>
      <ul className="flex-col flex text-white gap-2 m-0">
        {links.map((link, index) => (
          <li
            key={index}
            className="hover:text-white text-sm text-gray-400 list-none m-0"
          >
            <Link className="text-gray-400" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
