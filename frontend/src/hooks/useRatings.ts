import { useState, useCallback } from "react";
import { ratingsApi } from "../api/ratings";
import { type Rating } from "../types";

export const useRatings = () => {
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [ratingStats, setRatingStats] = useState<
    Record<
      string,
      {
        averageRating: number;
        totalRatings: number;
      }
    >
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRating = useCallback(async (bookId: string, rating: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const newRating = await ratingsApi.submitRating(bookId, rating);

      // Update local state
      setRatings((prev) => ({
        ...prev,
        [bookId]: newRating,
      }));

      // Fetch updated stats
      const stats = await ratingsApi.getBookRatingStats(bookId);
      setRatingStats((prev) => ({
        ...prev,
        [bookId]: stats,
      }));

      return newRating;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit rating";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserRating = useCallback(async (bookId: string) => {
    try {
      const rating = await ratingsApi.getUserRating(bookId);
      if (rating) {
        setRatings((prev) => ({
          ...prev,
          [bookId]: rating,
        }));
      }
      return rating;
    } catch (err) {
      console.error("Failed to get user rating:", err);
      return null;
    }
  }, []);

  const getBookRatingStats = useCallback(async (bookId: string) => {
    try {
      const stats = await ratingsApi.getBookRatingStats(bookId);
      setRatingStats((prev) => ({
        ...prev,
        [bookId]: stats,
      }));
      return stats;
    } catch (err) {
      console.error("Failed to get rating stats:", err);
      return { averageRating: 0, totalRatings: 0 };
    }
  }, []);

  const deleteRating = useCallback(async (bookId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await ratingsApi.deleteRating(bookId);

      // Remove from local state
      setRatings((prev) => {
        const newRatings = { ...prev };
        delete newRatings[bookId];
        return newRatings;
      });

      // Fetch updated stats
      const stats = await ratingsApi.getBookRatingStats(bookId);
      setRatingStats((prev) => ({
        ...prev,
        [bookId]: stats,
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete rating";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    ratings,
    ratingStats,
    isLoading,
    error,
    submitRating,
    getUserRating,
    getBookRatingStats,
    deleteRating,
  };
};
