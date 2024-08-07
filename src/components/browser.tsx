"use client";

import { useState } from "react";

const Browser = () => {
  const [search, setSearch] = useState("https://en.wikipedia.org/wiki/Goat");
  return (
    <div className="h-full w-full bg-slate-900">
      <input
        type="text"
        className="w-full border-b border-slate-600 p-2 text-black"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <iframe
        src={search}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Browser"
      />
    </div>
  );
};

export default Browser;
