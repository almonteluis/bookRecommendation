export type Book = {
  id: string;
  title: string;
  authors?: string[];
  thumbnail?: string;
  description?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
  userRating?: number; // User's rating for this book (1-5)
  averageRating?: number; // Average rating from all users
  totalRatings?: number; // Total number of ratings
};

export type GoogleBooksResponse = {
  items?: Array<{
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
      publishedDate?: string;
      pageCount?: number;
      categories?: string[];
      imageLinks?: {
        thumbnail?: string;
        smallThumbnail?: string;
      };
    };
  }>;
  totalItems: number;
};

export type SearchBarProps = {
  onSearch: (query: string) => void;
};

export type BookCardProps = {
  book: Book;
  onRatingChange?: (bookId: string, rating: number) => void;
};

export type Rating = {
  id: string;
  userId: string;
  bookId: string;
  rating: number; // 1-5 stars
  createdAt: string;
  updatedAt: string;
};

export type StarRatingProps = {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
};

export type RatingStatsProps = {
  averageRating?: number;
  totalRatings?: number;
  size?: "sm" | "md" | "lg";
};
