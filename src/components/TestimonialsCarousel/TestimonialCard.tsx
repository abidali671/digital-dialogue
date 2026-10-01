import type { AuthorTestimonial } from "@/constants/authors";
import config from "@/lib/config";

type Props = {
  item: AuthorTestimonial;
  featured?: boolean;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function sourceUrl(source: AuthorTestimonial["source"]) {
  return source === "Upwork" ? config.UPWORK_URL : config.FIVERR_URL;
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div
      className="flex items-center justify-center gap-1"
      aria-label={`${filled} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-5 w-5"
          aria-hidden
        >
          <path
            d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"
            fill={i < filled ? "#F5B942" : "#E2E8F0"}
          />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCard({ item, featured = false }: Props) {
  const rating = typeof item.rating === "number" ? item.rating : 5;
  const subtitle = item.project
    ? `${item.source} · ${item.project}`
    : `${item.source}`;

  return (
    <article className="relative mx-auto h-full w-full pt-12">
      {/* Notch disc matching section background */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-12 z-[1] h-[5.5rem] w-[5.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mist md:h-[6.5rem] md:w-[6.5rem]"
      />

      <div className="absolute left-1/2 top-12 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-accent-soft shadow-sm md:h-24 md:w-24">
        <span className="font-display text-xl font-bold tracking-tight text-accent md:text-2xl">
          {initials(item.clientName)}
        </span>
      </div>

      <div
        className={`flex h-full min-h-[20rem] flex-col rounded-[1.5rem] bg-white px-5 pb-8 pt-14 text-center md:min-h-[22rem] md:px-6 md:pt-16 ${
          featured
            ? "shadow-[0_22px_50px_rgba(15,23,42,0.14)]"
            : "shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
        }`}
      >
        <Stars rating={rating} />

        <blockquote className="mt-5 flex-1 text-sm leading-6 text-ink-soft md:text-base md:leading-7">
          “{item.quote}”
        </blockquote>

        <p className="mt-6 font-display text-base font-bold tracking-tight text-ink md:text-lg">
          {item.clientName}
        </p>
        <p className="mt-1 text-sm text-mute">
          <a
            href={sourceUrl(item.source)}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
            onClick={(event) => event.stopPropagation()}
          >
            {subtitle}
          </a>
        </p>
      </div>
    </article>
  );
}
