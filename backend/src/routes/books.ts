import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

console.log(
  "[Init] Loaded GOOGLE_BOOKS_API_KEY:",
  process.env.GOOGLE_BOOKS_API_KEY
);

router.get("/", async (req: Request, res: Response) => {
  const { q } = req.query;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  if (!q) {
    console.warn("[/api/books] Missing query param ?q=");
    return res.status(400).json({ error: "Missing search query ?q=" });
  }

  const requestUrl = "https://www.googleapis.com/books/v1/volumes";
  console.log("[/api/books] Querying:", requestUrl, "with q:", q);

  try {
    const response = await axios.get(requestUrl, {
      params: {
        q: q as string,
        key: apiKey,
        maxResults: 10,
      },
    });

    console.log(
      "[/api/books] Success — returned",
      response.data.items?.length || 0,
      "items."
    );
    res.json(response.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "[/api/books] Axios error:",
        err.response?.data || err.message
      );
    } else {
      console.error("[/api/books] Unexpected error:", err);
    }
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

export default router;
