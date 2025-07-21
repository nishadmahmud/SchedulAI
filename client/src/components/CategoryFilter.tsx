import React from "react";
import type { EventCategory } from "../types/Event";

const categories: (EventCategory | "All" | "Archived")[] = [
  "All",
  "Work",
  "Personal",
  "Health",
  "Travel",
  "Finance",
  "Other",
  "Archived",
];

interface CategoryFilterProps {
  selected: EventCategory | "All" | "Archived";
  onChange: (category: EventCategory | "All" | "Archived") => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onChange }) => {
  return (
    <>
      {/* Dropdown for mobile */}
      <select
        className="sm:hidden bg-gray-800 text-white rounded px-3 py-2 text-xs font-semibold border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full max-w-full min-w-0 flex-1"
        value={selected}
        onChange={e => onChange(e.target.value as EventCategory | "All" | "Archived")}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {/* Button group for desktop */}
      <div className="hidden sm:flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 rounded text-xs font-semibold transition border focus:outline-none focus:ring-2 focus:ring-cyan-400
              ${selected === cat
                ? "bg-cyan-600 text-white border-cyan-400"
                : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"}
            `}
            onClick={() => onChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoryFilter;
