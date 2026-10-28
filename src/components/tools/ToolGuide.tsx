import Link from "next/link";
import type { ReactNode } from "react";

export function In({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="fee-link" href={href}>
      {children}
    </Link>
  );
}

export function Out({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="fee-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Formula({ children }: { children: string }) {
  return (
    <div className="fee-formula">
      {children.split("\n").map((line) => (
        <p key={line}>{line.trim()}</p>
      ))}
    </div>
  );
}

export function DataTable({
  caption,
  columns,
  rows,
  numeric = false,
}: {
  caption: string;
  columns: string[];
  rows: ReactNode[][];
  numeric?: boolean;
}) {
  return (
    <div className="fee-guide-scroll">
      <table className={`fee-example-table fee-guide-table${numeric ? " fee-nums" : ""}`}>
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) =>
              cellIndex === 0 ? (
                <th key={cellIndex} scope="row">
                  {cell}
                </th>
              ) : (
                <td key={cellIndex}>{cell}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}
