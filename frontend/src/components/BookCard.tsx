import { type BookCardProps } from "../types";
import StarRating from "./StarRating";
import RatingStats from "./RatingStats";

export default function BookCard({ book, onRatingChange }: BookCardProps) {
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

  const handleRatingChange = (rating: number) => {
    if (onRatingChange) {
      onRatingChange(book.id, rating);
    }
  };

  return (
    <div
      className="group relative card-hover cursor-pointer focus-ring rounded-2xl overflow-hidden"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${book.title}${
        book.authors ? ` by ${book.authors.join(", ")}` : ""
      }`}
    >
      {/* Card Background with Gradient */}
      <div className="glass rounded-2xl p-6 h-full relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Book Cover Section */}
          <div className="flex-shrink-0 mb-6 relative">
            {book.thumbnail ? (
              <div className="relative group/image">
                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={book.thumbnail}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Floating action button */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200">
                    <svg
                      className="w-5 h-5 text-gray-700"
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
                  </button>
                </div>
              </div>
            ) : (
              <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <div className="text-center p-4">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <p className="font-body text-gray-500 text-sm font-medium">
                    No Cover Available
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Book Information */}
          <div className="flex-1 flex flex-col">
            {/* Title */}
            <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-900 transition-colors duration-300">
              {book.title}
            </h3>

            {/* Authors */}
            {book.authors && book.authors.length > 0 && (
              <div className="mb-4">
                <p className="font-body text-gray-600 font-medium text-sm mb-1">
                  by {book.authors.slice(0, 2).join(", ")}
                  {book.authors.length > 2 && (
                    <span className="text-gray-400">
                      {" "}
                      +{book.authors.length - 2} more
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Rating Section */}
            <div className="mb-4 space-y-2">
              {/* User Rating */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Your Rating:
                </p>
                <StarRating
                  rating={book.userRating || 0}
                  onRatingChange={handleRatingChange}
                  size="sm"
                />
              </div>

              {/* Average Rating Stats */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Community:
                </p>
                <RatingStats
                  averageRating={book.averageRating}
                  totalRatings={book.totalRatings}
                  size="sm"
                />
              </div>
            </div>

            {/* Book Details */}
            <div className="mt-auto space-y-2">
              {book.publishedDate && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-body">
                    {new Date(book.publishedDate).getFullYear()}
                  </span>
                </div>
              )}

              {book.pageCount && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="font-body">{book.pageCount} pages</span>
                </div>
              )}

              {book.categories && book.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {book.categories.slice(0, 2).map((category, index) => (
                    <span
                      key={index}
                      className="font-body px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <button className="w-full btn-primary py-3 rounded-xl font-semibold text-sm">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
      </div>
    </div>
  );
}
