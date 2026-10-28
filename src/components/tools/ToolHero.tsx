import type { ReactNode } from "react";

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ToolHero({
  title,
  intro,
  points,
}: {
  title: string;
  intro: string;
  points: ReactNode[];
}) {
  return (
    <>
      <h1>{title}</h1>
      <p className="fee-hero-intro">{intro}</p>
      <p className="fee-hero-badge">
        <Check />
        Free · No sign-up
      </p>
      <ul className="fee-hero-trust">
        {points.map((point, index) => (
          <li key={index}>
            <Check />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
