import React from "react";
import Logo from "../../../assets/icon/logo";
import Link from "next/link";
import ContentContainer from "../../ContentContainer";
import ChevronDown from "@/assets/icon/ChevronDown";
import Menu from "@/components/Menu";
import { ICategoryData } from "@/types";
import { useRouter } from "next/router";

interface INavbarProps {
  categories?: ICategoryData[];
}

const Navbar = ({ categories }: INavbarProps) => {
  const router = useRouter();

  const handleClickMenu = (slug: string) => {
    router.push({ pathname: "/blogs/[category]", query: { category: slug } });
  };

  return (
    <div className="container-root">
      <ContentContainer className="content-wrapper">
        <Link href="/">
          <Logo className="md:h-12 h-10 w-auto" />
        </Link>
        <ul className="nav-list">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
          {categories && categories.length > 0 && (
            <li>
              <Menu
                list={categories.map((category) => ({
                  label: category.fields.label,
                  onClick: () => handleClickMenu(category.fields.slug),
                }))}
                button={({ open }) => (
                  <>
                    Categories
                    <ChevronDown
                      className={`h-4 w-4 transition-all ${
                        open && "rotate-180"
                      }`}
                    />
                  </>
                )}
              />
            </li>
          )}
          <li>
            <Link href="/authors">Authors</Link>
          </li>
        </ul>
      </ContentContainer>
    </div>
  );
};

export default Navbar;
