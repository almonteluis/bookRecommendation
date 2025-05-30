import { type RatingStatsProps } from "../types";

export default function RatingStats({
  averageRating = 0,
  totalRatings = 0,
  size = "md",
}: RatingStatsProps) {
  const sizeClasses = {
    sm: {
      star: "w-3 h-3",
      text: "text-xs",
      gap: "gap-1",
    },
    md: {
      star: "w-4 h-4",
      text: "text-sm",
      gap: "gap-1.5",
    },
    lg: {
      star: "w-5 h-5",
      text: "text-base",
      gap: "gap-2",
    },
  };

  const classes = sizeClasses[size];

  if (totalRatings === 0) {
    return (
      <div className={`flex items-center ${classes.gap} text-gray-400`}>
        <svg
          className={`${classes.star} text-gray-300`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span className={`${classes.text} font-medium`}>No ratings yet</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${classes.gap}`}>
      <div className="flex items-center gap-0.5">
        <svg
          className={`${classes.star} text-yellow-400`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span className={`${classes.text} font-semibold text-gray-900`}>
          {averageRating.toFixed(1)}
        </span>
      </div>

      <span className={`${classes.text} text-gray-500`}>
        ({totalRatings} {totalRatings === 1 ? "rating" : "ratings"})
      </span>
    </div>
  );
}
