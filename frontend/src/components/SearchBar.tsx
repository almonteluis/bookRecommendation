import { useState } from "react";
import { type SearchBarProps } from "../types";

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-lg overflow-hidden border-2 border-gray-300"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for books by title, author, or keyword..."
            className="w-full p-2 text-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            aria-label="Search for books"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!query.trim()}
          aria-label="Search books"
          tabIndex={0}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
