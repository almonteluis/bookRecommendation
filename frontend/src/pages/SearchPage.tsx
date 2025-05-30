import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { searchBooks } from "../api/books";
import { type Book } from "../types";

export default function SearchPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usingMockData, setUsingMockData] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    setUsingMockData(false);
    setHasSearched(true);

    try {
      const data = await searchBooks(query);
      console.log(`Fetched ${data.length} books`);
      setBooks(data);
      // Check if we're likely using mock data (small fixed set)
      if (
        data.length <= 3 &&
        data.some((book) => book.title.includes("JavaScript"))
      ) {
        setUsingMockData(true);
      }
    } catch (err) {
      setError("Something went wrong while searching for books");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 mb-6 animate-float">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="text-visible font-medium text-lg">
                BookFinder
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black text-visible mb-6 leading-tight tracking-tight">
              Discover Your
              <span className="block text-visible font-extrabold">
                Next Great Read
              </span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-visible max-w-3xl mx-auto leading-relaxed font-light">
              Search through millions of books and find the perfect story that
              speaks to your soul
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="glass rounded-3xl p-8 md:p-12 animate-fade-in-scale">
              {usingMockData && (
                <div className="mb-8 p-4 glass-dark rounded-2xl border border-amber-400/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-amber-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium drop-shadow-sm">
                        Demo Mode Active
                      </p>
                      <p className="text-white/90 text-sm drop-shadow-sm">
                        Using sample data. Connect to Google Books API for real
                        results.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 animate-fade-in-scale">
              <div className="spinner mb-6"></div>
              <p className="text-white text-lg font-medium drop-shadow-md">
                Searching the literary universe...
              </p>
              <p className="text-white/90 text-sm mt-2 drop-shadow-sm">
                Finding the perfect books for you
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto animate-fade-in-up">
              <div className="glass rounded-2xl p-8 border-l-4 border-red-400">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Search Error
                    </h3>
                    <p className="text-gray-600">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {books.length > 0 && (
            <div className="animate-fade-in-up">
              <div className="glass rounded-3xl p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-heading text-3xl font-bold text-gray-900 mb-2">
                      Search Results
                    </h2>
                    <p className="font-body text-gray-600 text-lg">
                      Found {books.length} amazing{" "}
                      {books.length === 1 ? "book" : "books"} for you
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-gray-500">
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
                        d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8 17.926 17.926 0 00-1.87-8M9 9h6m-6 4h6m-6 4h6"
                      />
                    </svg>
                    <span className="font-body text-sm font-medium">
                      {books.length} results
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {books.map((book, index) => (
                    <div
                      key={book.id}
                      className="animate-fade-in-scale"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <BookCard book={book} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && books.length === 0 && hasSearched && (
            <div className="text-center py-16 animate-fade-in-up">
              <div className="glass rounded-3xl p-12 max-w-2xl mx-auto">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400"
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
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                  No Books Found
                </h3>
                <p className="font-body text-gray-600 text-lg mb-6">
                  We couldn't find any books matching your search. Try different
                  keywords or check your spelling.
                </p>
                <button
                  onClick={() => setHasSearched(false)}
                  className="btn-primary px-8 py-3 rounded-xl font-semibold"
                >
                  Try Another Search
                </button>
              </div>
            </div>
          )}

          {/* Welcome State */}
          {!loading && !error && books.length === 0 && !hasSearched && (
            <div className="text-center py-16 animate-fade-in-up">
              <div className="glass rounded-3xl p-12 max-w-3xl mx-auto">
                <div className="grid grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 animate-float"
                      style={{ animationDelay: "0s" }}
                    >
                      <svg
                        className="w-8 h-8 text-white"
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
                    <h4 className="font-heading font-semibold text-gray-900 mb-2">
                      Search
                    </h4>
                    <p className="font-body text-gray-600 text-sm">
                      Find books by title, author, or keyword
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4 animate-float"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold text-gray-900 mb-2">
                      Discover
                    </h4>
                    <p className="font-body text-gray-600 text-sm">
                      Explore detailed book information
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 animate-float"
                      style={{ animationDelay: "1s" }}
                    >
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold text-gray-900 mb-2">
                      Enjoy
                    </h4>
                    <p className="font-body text-gray-600 text-sm">
                      Find your next favorite read
                    </p>
                  </div>
                </div>

                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                  Ready to Find Your Next Adventure?
                </h3>
                <p className="font-body text-gray-600 text-lg">
                  Start by searching for any book, author, or topic that
                  interests you.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
