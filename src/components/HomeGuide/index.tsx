import Link from "next/link";
import ContentContainer from "../ContentContainer";
import PostFaqs from "../PostFaqs";
import Title from "../Title";
import { HOME_FAQS } from "@/lib/homeFaqs";

/**
 * Homepage prose. Card grids alone leave the document mostly markup,
 * which is what a low text-to-HTML ratio measures.
 */
const HomeGuide = () => {
  return (
    <>
      <section className="border-b border-line bg-mist">
        <ContentContainer className="py-14 md:py-16">
          <div className="article-wrapper">
            <Title as="h2">About Digital Dialogue</Title>
            <p>
              Digital Dialogue is a freelancing blog by{" "}
              <Link href="/authors/abid-ali">Abid Ali</Link>, a full-stack web
              developer who freelances from Pakistan. The guides cover choosing
              a platform, building an Upwork profile, writing proposals and
              understanding fees and Connects. Each one is written to help you
              take the next step. Older posts about fees or platform rules may
              change, so check the date at the top of each article.{" "}
              <Link href="/about">Read more about the site →</Link>
            </p>
          </div>
        </ContentContainer>
      </section>
      <section className="border-b border-line bg-white">
        <ContentContainer className="py-14 md:py-16">
          <div className="article-wrapper">
            <PostFaqs faqs={HOME_FAQS} className="" />
          </div>
        </ContentContainer>
      </section>
    </>
  );
};

export default HomeGuide;
