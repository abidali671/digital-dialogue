import type { Metadata } from "next";
import Link from "next/link";
import constants from "@/constants";
import config from "@/lib/config";
import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { pageTitle, resolvePageTitle } from "@/lib/metadata";

const ABOUT_TITLE = "About Digital Dialogue | Who We Are and What We Publish";

export const metadata: Metadata = {
  title: pageTitle(ABOUT_TITLE),
  description: constants.descriptions.ABOUT,
  alternates: { canonical: "/about" },
  openGraph: {
    title: resolvePageTitle(ABOUT_TITLE),
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
          Digital Dialogue is a practical blog on freelancing. We publish
          guides on platforms, profiles, proposals, fees, and landing client
          work—for people who want a clear next step, not another theory dump.
        </p>

        <h2>Who runs the site</h2>
        <p>
          Digital Dialogue is owned and operated by {config.AUTHOR_NAME}, based
          in Pakistan. He is a full-stack developer and freelancer who writes
          and edits for beginners and web developers who need steps they can
          use the same day.
        </p>
        <p>
          You can meet the writing team on the{" "}
          <Link href="/authors">authors page</Link>, use the{" "}
          <Link href="/contact-us">contact form</Link>, or reach him on{" "}
          <Link
            href={config.LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          .
        </p>

        <h2>Why this site exists</h2>
        <p>
          A lot of freelancing advice is either too vague or too long. Digital
          Dialogue exists to answer real questions in plain language: which
          platform to use, how to build an Upwork profile, what to put in a
          proposal, and how fees and Connects actually work.
        </p>
        <p>
          If a post does not help you choose, start, or fix something, it does
          not belong here.
        </p>

        <h2>What you will find</h2>
        <ul>
          <li>
            <Link href="/blogs/freelancing">Freelancing guides</Link>: platforms,
            profiles, proposals, fees, and first clients
          </li>
          <li>
            Upwork walkthroughs: how the marketplace works, beginner setup, and
            winning jobs
          </li>
          <li>
            Platform comparisons: Upwork, Fiverr, Freelancer, and when each fits
          </li>
          <li>
            Practical next steps for web developers selling freelance services
          </li>
        </ul>
        <p>
          Start with the <Link href="/blogs">blog index</Link>, or send a
          question through the <Link href="/contact-us">contact page</Link>.
        </p>

        <h2>Policies</h2>
        <p>
          How we handle visitor data is explained in the{" "}
          <Link href="/privacy-policy">privacy policy</Link>. Site use rules are
          in the <Link href="/terms-of-service">terms of service</Link>.
          Affiliate and advertising relationships are in the{" "}
          <Link href="/affiliate-disclosure">affiliate disclosure</Link>. Limits
          on how to use our articles are in the{" "}
          <Link href="/disclaimer">disclaimer</Link>.
        </p>
      </div>
    </ContentContainer>
  );
}
