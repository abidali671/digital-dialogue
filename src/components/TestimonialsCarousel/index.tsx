"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AuthorTestimonial } from "@/constants/authors";
import TestimonialCard from "./TestimonialCard";

type Props = {
  testimonials: AuthorTestimonial[];
};

function wrapIndex(value: number, count: number) {
  return ((value % count) + count) % count;
}

/** Shortest signed distance from active to i on a circular list. */
function circularOffset(i: number, active: number, count: number) {
  let diff = i - active;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  return diff;
}

export default function TestimonialsCarousel({ testimonials }: Props) {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(wrapIndex(next, count));
    },
    [count]
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => wrapIndex(current + 1, count));
    }, 7000);
    return () => window.clearInterval(id);
  }, [count]);

  if (count === 0) return null;

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div
        className="relative mx-auto h-[30rem] w-full [perspective:1200px] sm:h-[32rem]"
        style={{ perspectiveOrigin: "50% 45%" }}
      >
        {testimonials.map((item, i) => {
          const offset = circularOffset(i, index, count);
          const abs = Math.abs(offset);
          const isCenter = offset === 0;
          const isSide = abs === 1;
          const hidden = abs > 1;

          // Side cards sit toward the corners, slightly behind the center.
          const rotateY = offset === -1 ? 8 : offset === 1 ? -8 : 0;
          const translateX =
            offset === -1 ? "-110%" : offset === 1 ? "110%" : "0%";
          const scale = isCenter ? 1 : isSide ? 0.88 : 0.7;
          const opacity = isCenter ? 1 : isSide ? 0.85 : 0;
          const zIndex = isCenter ? 30 : isSide ? 10 : 0;

          return (
            <div
              key={`${item.source}-${item.clientName}-${item.quote.slice(0, 32)}`}
              className="absolute left-1/2 top-1/2 w-[min(92vw,22rem)] origin-center transition-all duration-500 ease-out [transform-style:preserve-3d] sm:w-[min(100%,22rem)]"
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              <div
                role={isCenter ? undefined : "button"}
                tabIndex={hidden || isCenter ? undefined : 0}
                onClick={() => {
                  if (!isCenter) goTo(i);
                }}
                onKeyDown={(event) => {
                  if (isCenter) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    goTo(i);
                  }
                }}
                aria-label={
                  isCenter
                    ? undefined
                    : `Show testimonial from ${item.clientName}`
                }
                className={isCenter ? undefined : "cursor-pointer"}
              >
                <div
                  className={
                    isCenter
                      ? "transition-shadow duration-500"
                      : "transition-[filter,opacity] duration-500 [filter:brightness(0.92)]"
                  }
                >
                  <TestimonialCard item={item} featured={isCenter} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <div className="mt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((item, i) => (
                <button
                  key={`dot-${item.clientName}-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-accent"
                      : "w-2.5 bg-line hover:bg-mute-soft"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <p className="sr-only" aria-live="polite">
            Testimonial {index + 1} of {count}
          </p>
        </>
      )}
    </div>
  );
}
