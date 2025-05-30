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

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    setUsingMockData(false);
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
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Book Search
      </h1>

      {usingMockData && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md text-sm">
          <strong>Demo Mode:</strong> Using sample data. To connect to real
          Google Books API, ensure the backend is running with a valid API key.
        </div>
      )}

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="ml-2 text-gray-600">Searching for books...</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {books.length > 0 && (
        <div className="mt-8">
          <p className="text-gray-600 mb-4">Found {books.length} books</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-500 text-lg">
            Search for books to get started!
          </p>
        </div>
      )}
    </div>
  );
}
