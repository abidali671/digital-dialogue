import type { IFaq } from "@/types";

type PostFaqsProps = {
  faqs: IFaq[];
};

export default function PostFaqs({ faqs }: PostFaqsProps) {
  if (!faqs.length) return null;

  return (
    <section className="mt-14 border-t border-line pt-10" aria-labelledby="faqs-heading">
      <h2
        id="faqs-heading"
        className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl"
      >
        Frequently asked questions
      </h2>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-4">
            <summary className="cursor-pointer list-none font-display text-lg font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                <span>{faq.question}</span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 font-mono text-sm text-mute transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-base leading-7 text-mute md:text-lg md:leading-8">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
