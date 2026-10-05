import type { Metadata } from "next";
import Link from "next/link";
import constants from "@/constants";
import config from "@/lib/config";
import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { pageTitle, resolvePageTitle } from "@/lib/metadata";

const CONTACT_TITLE = "Contact Digital Dialogue | Questions and Partnerships";

export const metadata: Metadata = {
  title: pageTitle(CONTACT_TITLE),
  description: constants.descriptions.CONTACT_US,
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: resolvePageTitle(CONTACT_TITLE),
    description: constants.descriptions.CONTACT_US,
    url: "/contact-us",
  },
};

export default function ContactUsPage() {
  return (
    <ContentContainer className="py-16 md:py-20">
      <div className="mb-10 max-w-3xl">
        <Title>Contact us</Title>
        <p className="mt-6 text-base leading-relaxed text-mute md:text-lg">
          Digital Dialogue is run by {config.AUTHOR_NAME} from Pakistan. Use
          this page for guide feedback, corrections, article ideas, or
          partnerships that fit the site. Email{" "}
          <a
            href={`mailto:${config.CONTACT_EMAIL}`}
            className="font-semibold text-accent hover:text-accent-hover"
          >
            {config.CONTACT_EMAIL}
          </a>
          , or reach him on{" "}
          <Link
            href={config.LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:text-accent-hover"
          >
            LinkedIn
          </Link>
          ,{" "}
          <Link
            href={config.UPWORK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:text-accent-hover"
          >
            Upwork
          </Link>
          , or{" "}
          <Link
            href={config.FIVERR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:text-accent-hover"
          >
            Fiverr
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
            Send a message
          </h2>
          <p className="mt-3 text-base text-mute">
            Include your name, a working email, and a clear subject. Say what
            you need in a few sentences. You can also write directly to{" "}
            <a
              href={`mailto:${config.CONTACT_EMAIL}`}
              className="font-semibold text-accent hover:text-accent-hover"
            >
              {config.CONTACT_EMAIL}
            </a>
            .
          </p>
          <form
            action={config.FORM_ACTION}
            method="POST"
            className="mt-6 grid gap-4"
          >
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-wide text-mute">
                Name
              </span>
              <input
                type="text"
                placeholder="Your name"
                name="name"
                className="form-input"
                required
              />
            </label>
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-wide text-mute">
                Email
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                name="email"
                className="form-input"
                required
              />
            </label>
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-wide text-mute">
                Subject
              </span>
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                className="form-input"
                required
              />
            </label>
            <label className="grid gap-2">
              <span className="font-mono text-xs uppercase tracking-wide text-mute">
                Message
              </span>
              <textarea
                placeholder="Write your message"
                name="message"
                className="form-input"
                rows={6}
                required
              />
            </label>
            <button className="btn-primary w-fit" type="submit">
              Send message
            </button>
          </form>
        </div>

        <div className="article-wrapper">
          <h2>What to write about</h2>
          <p>Messages that usually get a useful reply include:</p>
          <ul>
            <li>
              Feedback on a guide (something unclear, outdated, or missing)
            </li>
            <li>
              A topic request that fits freelancing, platforms, or client work
            </li>
            <li>
              Partnership or guest ideas that help readers take a clearer next
              step
            </li>
            <li>Privacy, terms, or data questions related to this site</li>
          </ul>
          <p>
            For hire requests, use Upwork or Fiverr when you want project work.
            This form is for the publication, not a substitute for a freelance
            contract.
          </p>

          <h2>Before you send</h2>
          <p>
            If your question is already answered in a guide, start with the{" "}
            <Link href="/blogs">article index</Link> or the{" "}
            <Link href="/blogs/freelancing">freelancing category</Link>. A short
            note that links the exact post saves time and gets a better answer.
          </p>
          <h2>Policies</h2>
          <p>
            How visitor data is handled is in the{" "}
            <Link href="/privacy-policy">privacy policy</Link>. Site rules are
            in the <Link href="/terms-of-service">terms of service</Link>.
            Affiliate and advertising notes are in the{" "}
            <Link href="/affiliate-disclosure">affiliate disclosure</Link>. For
            the story behind the site, see the{" "}
            <Link href="/about">about page</Link>.
          </p>
        </div>
      </div>
    </ContentContainer>
  );
}
