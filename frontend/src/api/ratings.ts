import { type Rating } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5004";

export const ratingsApi = {
  // Submit or update a rating
  submitRating: async (bookId: string, rating: number): Promise<Rating> => {
    const response = await fetch(`${API_BASE_URL}/api/ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        rating,
        userId: "user-1", // TODO: Replace with actual user ID from auth
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit rating: ${response.statusText}`);
    }

    return response.json();
  },

  // Get user's rating for a specific book
  getUserRating: async (bookId: string): Promise<Rating | null> => {
    const userId = "user-1"; // TODO: Replace with actual user ID from auth
    const response = await fetch(
      `${API_BASE_URL}/api/ratings/${bookId}/user/${userId}`
    );

    if (response.status === 404) {
      return null; // No rating found
    }

    if (!response.ok) {
      throw new Error(`Failed to get user rating: ${response.statusText}`);
    }

    return response.json();
  },

  // Get rating statistics for a book
  getBookRatingStats: async (
    bookId: string
  ): Promise<{
    averageRating: number;
    totalRatings: number;
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/ratings/${bookId}/stats`);

    if (!response.ok) {
      throw new Error(`Failed to get rating stats: ${response.statusText}`);
    }

    return response.json();
  },

  // Get all ratings for a book
  getBookRatings: async (bookId: string): Promise<Rating[]> => {
    const response = await fetch(`${API_BASE_URL}/api/ratings/${bookId}`);

    if (!response.ok) {
      throw new Error(`Failed to get book ratings: ${response.statusText}`);
    }

    return response.json();
  },

  // Delete a rating
  deleteRating: async (bookId: string): Promise<void> => {
    const userId = "user-1"; // TODO: Replace with actual user ID from auth
    const response = await fetch(
      `${API_BASE_URL}/api/ratings/${bookId}/user/${userId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete rating: ${response.statusText}`);
    }
  },
};
