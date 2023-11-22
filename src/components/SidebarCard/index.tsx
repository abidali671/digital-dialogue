import React from "react";
import Link from "next/link";

interface SidebarProps {
  title: string;
  link: string;
  data: unknown[];
  renderItem: (item: unknown) => JSX.Element;
}

function SidebarCard({ title, data, link, renderItem }: SidebarProps) {
  return (
    <div className="sidebar-card">
      <div className="sidebar-card-title">
        <h3 className="text-base">{title}</h3>
        <Link href={link} className="font-medium text-blue-400 text-sm">
          View All
        </Link>
      </div>
      <ul className="sidebar-card-list">
        {data.map((item, index) => (
          <div className="sidebar-card-item" key={index}>
            {renderItem(item)}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SidebarCard;
