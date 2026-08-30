import type { Metadata } from "next";
import constants from "@/constants";
import config from "@/lib/config";
import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Digital Dialogue | Questions and Partnerships",
  },
  description: constants.descriptions.CONTACT_US,
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Digital Dialogue | Questions and Partnerships",
    description: constants.descriptions.CONTACT_US,
    url: "/contact-us",
  },
};

export default function ContactUsPage() {
  return (
    <ContentContainer className="py-16 md:py-20">
      <div className="grid max-w-2xl gap-8">
        <Title>Contact us</Title>
        <p className="text-mute">
          Questions, partnerships, or feedback. Send a message and we will get
          back to you. You can also reach {config.AUTHOR_NAME} on LinkedIn,
          Upwork, or Fiverr.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {config.SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              {link.label}
            </a>
          ))}
        </div>
        <form
          action={config.FORM_ACTION}
          method="POST"
          className="grid gap-4"
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
              rows={5}
              required
            />
          </label>
          <button className="btn-primary w-fit" type="submit">
            Send message
          </button>
        </form>
      </div>
    </ContentContainer>
  );
}
