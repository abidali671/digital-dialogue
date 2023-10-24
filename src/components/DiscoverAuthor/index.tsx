import Image from "next/image";
import React from "react";

const DiscoverAuthor = () => {
  return (
    <div className="author-card">
      <div className="author-title">
        <h3 className="text-lg">Discover Authors</h3>
        <button className="font-bold text-blue-600 text-sm">View All</button>
      </div>
      <ul className="flex flex-col m-0">
        <li className="author-list">
          <Image
            width="50"
            height="50"
            className="author-img"
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwYm95fGVufDB8fDB8fHww"
            alt="image"
          />
          <div className="flex flex-col">
            <h3 className="text-lg">Truelock Alric</h3>
            <p className="text-gray-400 font-light text-base">Author Job</p>
          </div>
        </li>
        <li className="author-list">
          <Image
            width="50"
            height="50"
            className="author-img"
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwYm95fGVufDB8fDB8fHww"
            alt="image"
          />
          <div className="flex flex-col">
            <h3 className="text-lg">Truelock Alric</h3>
            <p className="text-gray-400 font-light text-base">Author Job</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DiscoverAuthor;
