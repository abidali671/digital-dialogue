import React from "react";

interface SidebarProps {
  title: string;
  link: string;
  data: unknown[];
  renderItem: (item: unknown) => JSX.Element;
}

function SidebarCard({ title, data, renderItem }: SidebarProps) {
  return (
    <div className="sidebar-card">
      <div className="sidebar-card-title">
        <h3 className="text-base">{title}</h3>
        <button className="font-bold text-blue-600 text-sm">View All</button>
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
