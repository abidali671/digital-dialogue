import type { ReactNode } from "react";

function Check() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 20 20"
      className="shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path
        d="M4.5 10.5l3.5 3.5 7.5-8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ToolHero({
  title,
  intro,
  points,
  action,
}: {
  title: string;
  intro: ReactNode;
  points: ReactNode[];
  action?: ReactNode;
}) {
  return (
    <>
      {/* Hide badge/trust before CSS so unsized SVGs cannot inflate the 390px column. */}
      <style>{`
        .fee-page .fee-hero-badge,
        .fee-page .fee-hero-trust { display: none !important; }
        @media (min-width: 1024px) {
          .fee-page .fee-hero-badge { display: inline-flex !important; }
          .fee-page .fee-hero-trust { display: block !important; }
        }
      `}</style>
      <h1>{title}</h1>
      {typeof intro === "string" ? (
        <p className="fee-hero-intro">{intro}</p>
      ) : (
        intro
      )}
      {action ? (
        <div className="fee-hero-actions">
          {action}
          <p className="fee-hero-badge">
            <Check />
            Free to use · No sign-up required
          </p>
        </div>
      ) : (
        <p className="fee-hero-badge">
          <Check />
          Free to use · No sign-up required
        </p>
      )}
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
