export interface Rating {
  id: string;
  userId: string;
  bookId: string;
  rating: number; // 1-5 stars
  createdAt: string;
  updatedAt: string;
}

export interface RatingStats {
  averageRating: number;
  totalRatings: number;
}

export interface CreateRatingRequest {
  userId: string;
  bookId: string;
  rating: number;
}

export interface UpdateRatingRequest {
  rating: number;
}
