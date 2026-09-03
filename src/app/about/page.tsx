import type { Metadata } from "next";
import Link from "next/link";
import constants from "@/constants";
import config from "@/lib/config";
import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";

export const metadata: Metadata = {
  title: {
    absolute: "About Digital Dialogue | Who We Are and What We Publish",
  },
  description: constants.descriptions.ABOUT,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Digital Dialogue | Who We Are and What We Publish",
    description: constants.descriptions.ABOUT,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <ContentContainer className="py-16 md:py-20">
      <div className="reading-column article-wrapper">
        <Title>About Digital Dialogue</Title>

        <p>
          Digital Dialogue is a practical blog on freelancing, technology, web
          development, digital marketing, content creation, and design. We
          publish guides, teardowns, and explainers for people who want to
          ship work, not collect theory.
        </p>

        <h2>Who runs the site</h2>
        <p>
          Digital Dialogue is owned and operated by {config.AUTHOR_NAME}, based
          in Pakistan. He writes and edits for builders, freelancers, and junior
          developers who need clear steps they can use the same day.
        </p>
        <p>
          You can meet the writing team on the{" "}
          <Link href="/authors">authors page</Link>, email{" "}
          <a href={`mailto:${config.EMAIL}`}>{config.EMAIL}</a>, use the{" "}
          <Link href="/contact-us">contact form</Link>, or reach him on{" "}
          <a
            href={config.LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>

        <h2>Why this site exists</h2>
        <p>
          A lot of online advice is either too vague or too long. Digital
          Dialogue exists to answer real questions in plain language: which
          freelance platform to use, how HTML and CSS still fit together, how
          to judge a marketing agency, and similar decisions people actually
          have to make.
        </p>
        <p>
          If a post does not help you choose, start, or fix something, it does
          not belong here.
        </p>

        <h2>What you will find</h2>
        <ul>
          <li>Freelancing: platforms, first clients, and working from home</li>
          <li>Web development: HTML, CSS, JavaScript, and practical frontend skills</li>
          <li>Technology: blockchain and other tools, explained without hype</li>
          <li>Digital marketing: traffic, agencies, and measurement</li>
          <li>Design: UX, color, and why design choices matter</li>
        </ul>
        <p>
          Start with the <Link href="/blogs">blog index</Link>, or send a
          question through the <Link href="/contact-us">contact page</Link>.
        </p>

        <h2>Policies</h2>
        <p>
          How we handle visitor data is explained in the{" "}
          <Link href="/privacy-policy">privacy policy</Link>. Limits on how to
          use our articles are in the{" "}
          <Link href="/disclaimer">disclaimer</Link>.
        </p>
      </div>
    </ContentContainer>
  );
}
