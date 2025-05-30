import { useState } from "react";
import { type StarRatingProps } from "../types";

export default function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
  showValue = false,
}: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleStarClick = (starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleStarHover = (starRating: number) => {
    if (!readonly) {
      setHoveredRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoveredRating(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, starRating: number) => {
    if (!readonly && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleStarClick(starRating);
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <div className="flex items-center gap-1">
      <div
        className="flex items-center gap-0.5"
        onMouseLeave={handleMouseLeave}
        role={readonly ? "img" : "radiogroup"}
        aria-label={
          readonly ? `Rating: ${rating} out of 5 stars` : "Rate this book"
        }
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayRating;
          const isHovered = !readonly && star <= hoveredRating;

          return (
            <button
              key={star}
              type="button"
              disabled={readonly}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onKeyDown={(e) => handleKeyDown(e, star)}
              className={`
                ${
                  readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
                }
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded
                ${!readonly ? "active:scale-95" : ""}
              `}
              aria-label={
                readonly
                  ? undefined
                  : `Rate ${star} star${star !== 1 ? "s" : ""}`
              }
              tabIndex={readonly ? -1 : 0}
            >
              <svg
                className={`
                  ${sizeClasses[size]}
                  transition-all duration-200
                  ${
                    isFilled
                      ? isHovered
                        ? "text-yellow-400 drop-shadow-sm"
                        : "text-yellow-400"
                      : isHovered
                      ? "text-yellow-300"
                      : "text-gray-300"
                  }
                `}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-600">
          {rating > 0 ? `${rating}/5` : "No rating"}
        </span>
      )}
    </div>
  );
}
