import { type BookCardProps } from "../types";

export default function BookCard({ book }: BookCardProps) {
  const handleClick = () => {
    // Future: Navigate to book details or add to favorites
    console.log(`Clicked on book: ${book.title}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${book.title}${
        book.authors ? ` by ${book.authors.join(", ")}` : ""
      }`}
    >
      <div className="flex flex-col h-full">
        {book.thumbnail ? (
          <div className="flex-shrink-0 mb-3">
            <img
              src={book.thumbnail}
              alt={`Cover of ${book.title}`}
              className="w-full h-48 object-cover rounded-md"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 mb-3 bg-gray-200 rounded-md h-48 flex items-center justify-center">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {book.title}
          </h2>

          {book.authors && book.authors.length > 0 && (
            <p className="text-sm text-gray-600 mt-auto">
              by {book.authors.join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
