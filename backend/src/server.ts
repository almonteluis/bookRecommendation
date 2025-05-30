import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import booksRouter from "./routes/books";
import ratingsRouter from "./routes/ratings";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/ratings", ratingsRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`[Server] Listening on http://localhost:${PORT}`);
  console.log(
    "[Server] Loaded GOOGLE_BOOKS_API_KEY:",
    process.env.GOOGLE_BOOKS_API_KEY
  );
});
