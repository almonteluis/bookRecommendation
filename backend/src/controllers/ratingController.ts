import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Rating, RatingStats, CreateRatingRequest } from "../models/Rating";

// In-memory storage for ratings (replace with database in production)
let ratings: Rating[] = [];

export const ratingController = {
  // Submit or update a rating
  submitRating: async (req: Request, res: Response) => {
    try {
      const { userId, bookId, rating }: CreateRatingRequest = req.body;

      // Validate input
      if (!userId || !bookId || !rating) {
        return res.status(400).json({
          error: "Missing required fields: userId, bookId, rating"
        });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          error: "Rating must be between 1 and 5"
        });
      }

      // Check if user already rated this book
      const existingRatingIndex = ratings.findIndex(
        r => r.userId === userId && r.bookId === bookId
      );

      const now = new Date().toISOString();

      if (existingRatingIndex !== -1) {
        // Update existing rating
        ratings[existingRatingIndex] = {
          ...ratings[existingRatingIndex],
          rating,
          updatedAt: now
        };
        res.json(ratings[existingRatingIndex]);
      } else {
        // Create new rating
        const newRating: Rating = {
          id: uuidv4(),
          userId,
          bookId,
          rating,
          createdAt: now,
          updatedAt: now
        };
        ratings.push(newRating);
        res.status(201).json(newRating);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get user's rating for a specific book
  getUserRating: async (req: Request, res: Response) => {
    try {
      const { bookId, userId } = req.params;

      const userRating = ratings.find(
        r => r.userId === userId && r.bookId === bookId
      );

      if (!userRating) {
        return res.status(404).json({ error: "Rating not found" });
      }

      res.json(userRating);
    } catch (error) {
      console.error("Error getting user rating:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get rating statistics for a book
  getBookRatingStats: async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;

      const bookRatings = ratings.filter(r => r.bookId === bookId);
      
      if (bookRatings.length === 0) {
        return res.json({
          averageRating: 0,
          totalRatings: 0
        });
      }

      const totalRating = bookRatings.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / bookRatings.length;

      const stats: RatingStats = {
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        totalRatings: bookRatings.length
      };

      res.json(stats);
    } catch (error) {
      console.error("Error getting rating stats:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get all ratings for a book
  getBookRatings: async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;

      const bookRatings = ratings.filter(r => r.bookId === bookId);
      res.json(bookRatings);
    } catch (error) {
      console.error("Error getting book ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Delete a rating
  deleteRating: async (req: Request, res: Response) => {
    try {
      const { bookId, userId } = req.params;

      const ratingIndex = ratings.findIndex(
        r => r.userId === userId && r.bookId === bookId
      );

      if (ratingIndex === -1) {
        return res.status(404).json({ error: "Rating not found" });
      }

      ratings.splice(ratingIndex, 1);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting rating:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get all ratings (for admin/debugging)
  getAllRatings: async (req: Request, res: Response) => {
    try {
      res.json(ratings);
    } catch (error) {
      console.error("Error getting all ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}; 