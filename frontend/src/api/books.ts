import { type Book, type GoogleBooksResponse } from "../types";

// Mock data for testing
const mockBooksData: GoogleBooksResponse = {
  items: [
    {
      id: "1",
      volumeInfo: {
        title: "JavaScript: The Good Parts",
        authors: ["Douglas Crockford"],
        description:
          "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined.",
        publishedDate: "2008-05-08",
        pageCount: 176,
        categories: ["Computers"],
        imageLinks: {
          thumbnail:
            "http://books.google.com/books/content?id=PXa2bby0oQ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
      },
    },
    {
      id: "2",
      volumeInfo: {
        title: "Eloquent JavaScript",
        authors: ["Marijn Haverbeke"],
        description: "A modern introduction to programming using JavaScript.",
        publishedDate: "2018-12-04",
        pageCount: 472,
        categories: ["Computers"],
        imageLinks: {
          thumbnail:
            "http://books.google.com/books/content?id=mDzDBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
      },
    },
    {
      id: "3",
      volumeInfo: {
        title: "You Don't Know JS: Up & Going",
        authors: ["Kyle Simpson"],
        description:
          "It's easy to learn parts of JavaScript, but much harder to learn it completely—or even sufficiently—whether you're new to the language or have used it for years.",
        publishedDate: "2015-04-10",
        pageCount: 88,
        categories: ["Computers"],
      },
    },
  ],
  totalItems: 3,
};

export const searchBooks = async (query: string): Promise<Book[]> => {
  if (!query.trim()) {
    throw new Error("Search query cannot be empty");
  }

  try {
    // Try to call the real API first
    const response = await fetch(
      `/api/books?q=${encodeURIComponent(query.trim())}`
    );

    if (response.ok) {
      const data: GoogleBooksResponse = await response.json();
      console.log("API Response:", data);

      if (!data.items || data.items.length === 0) {
        return [];
      }

      return data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title || "Unknown Title",
        authors: item.volumeInfo.authors || [],
        thumbnail:
          item.volumeInfo.imageLinks?.thumbnail ||
          item.volumeInfo.imageLinks?.smallThumbnail,
        description: item.volumeInfo.description,
        publishedDate: item.volumeInfo.publishedDate,
        pageCount: item.volumeInfo.pageCount,
        categories: item.volumeInfo.categories,
      }));
    } else {
      // If API fails, use mock data
      console.log("API failed, using mock data");
      return mockBooksData
        .items!.filter(
          (item) =>
            item.volumeInfo.title.toLowerCase().includes(query.toLowerCase()) ||
            item.volumeInfo.authors?.some((author) =>
              author.toLowerCase().includes(query.toLowerCase())
            )
        )
        .map((item) => ({
          id: item.id,
          title: item.volumeInfo.title || "Unknown Title",
          authors: item.volumeInfo.authors || [],
          thumbnail:
            item.volumeInfo.imageLinks?.thumbnail ||
            item.volumeInfo.imageLinks?.smallThumbnail,
          description: item.volumeInfo.description,
          publishedDate: item.volumeInfo.publishedDate,
          pageCount: item.volumeInfo.pageCount,
          categories: item.volumeInfo.categories,
        }));
    }
  } catch (error) {
    console.error("Error searching books, using mock data:", error);

    // Fallback to mock data
    return mockBooksData
      .items!.filter(
        (item) =>
          item.volumeInfo.title.toLowerCase().includes(query.toLowerCase()) ||
          item.volumeInfo.authors?.some((author) =>
            author.toLowerCase().includes(query.toLowerCase())
          )
      )
      .map((item) => ({
        id: item.id,
        title: item.volumeInfo.title || "Unknown Title",
        authors: item.volumeInfo.authors || [],
        thumbnail:
          item.volumeInfo.imageLinks?.thumbnail ||
          item.volumeInfo.imageLinks?.smallThumbnail,
        description: item.volumeInfo.description,
        publishedDate: item.volumeInfo.publishedDate,
        pageCount: item.volumeInfo.pageCount,
        categories: item.volumeInfo.categories,
      }));
  }
};
