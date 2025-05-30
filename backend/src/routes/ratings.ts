import express from "express";
import { ratingController } from "../controllers/ratingController";

const router = express.Router();

// POST /api/ratings - Submit or update a rating
router.post("/", ratingController.submitRating);

// GET /api/ratings/:bookId/user/:userId - Get user's rating for a book
router.get("/:bookId/user/:userId", ratingController.getUserRating);

// GET /api/ratings/:bookId/stats - Get rating statistics for a book
router.get("/:bookId/stats", ratingController.getBookRatingStats);

// GET /api/ratings/:bookId - Get all ratings for a book
router.get("/:bookId", ratingController.getBookRatings);

// DELETE /api/ratings/:bookId/user/:userId - Delete a rating
router.delete("/:bookId/user/:userId", ratingController.deleteRating);

// GET /api/ratings - Get all ratings (for admin/debugging)
router.get("/", ratingController.getAllRatings);

export default router;
