import { useState } from "react";
import { type SearchBarProps } from "../types";

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative group">
        <div
          className={`
          relative flex items-center rounded-2xl overflow-hidden transition-all duration-300 ease-out
          ${
            isFocused
              ? "ring-4 ring-blue-500/20 shadow-2xl shadow-blue-500/25"
              : "shadow-xl hover:shadow-2xl"
          }
        `}
        >
          {/* Search Icon */}
          <div className="absolute left-6 z-10">
            <svg
              className={`w-6 h-6 transition-colors duration-300 ${
                isFocused ? "text-blue-500" : "text-gray-400"
              }`}
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
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for books, authors, or topics..."
            className={`
              w-full pl-16 pr-32 py-6 text-lg font-medium
              bg-white/95 backdrop-blur-xl
              border-0 outline-none
              placeholder-gray-400
              transition-all duration-300 ease-out
              ${isFocused ? "bg-white text-gray-900" : "text-gray-700"}
            `}
            aria-label="Search for books"
            autoComplete="off"
          />

          {/* Search Button */}
          <button
            type="submit"
            disabled={!query.trim()}
            className={`
              absolute right-3 px-8 py-3 rounded-xl font-semibold text-white
              transition-all duration-300 ease-out
              focus:outline-none focus:ring-4 focus:ring-blue-500/20
              ${
                query.trim()
                  ? "btn-primary hover:scale-105 active:scale-95"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
            aria-label="Search books"
            tabIndex={0}
          >
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Search</span>
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Floating suggestions (placeholder for future enhancement) */}
        {isFocused && query.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 z-20">
            <div className="glass rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3 text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="text-sm">
                  Press Enter to search for "{query}"
                </span>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Popular searches hint */}
      <div className="mt-6 text-center">
        <p className="text-gray/70 text-sm mb-3">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {["JavaScript", "Fiction", "Science", "History", "Biography"].map(
            (term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  onSearch(term);
                }}
                className="px-4 py-2 rounded-full bg-gray-300 text-white/90 text-sm font-medium hover:text-white hover:scale-105 transition-all duration-200"
              >
                {term}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
