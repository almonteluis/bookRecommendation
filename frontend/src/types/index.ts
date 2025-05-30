export type Book = {
  id: string;
  title: string;
  authors?: string[];
  thumbnail?: string;
  description?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
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
};
