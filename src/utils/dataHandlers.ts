import { Quote } from "@/types/books";

/*
 * uses regex to parse the .txt file into an array of Book objects
 */
export const parseBookText = (bookText: string): Quote[] => {
  const quoteStrings = bookText
    .split(/(?<=[.?!])\s+/)
    .filter((quote) => quote.length > 50 && quote.length < 500)
    .map((q) => q.trim());

  return quoteStrings.map((q, i) => ({
    quote: q,
    key: i,
  }));
};

/*
 * Fetchs the .txt file for the bookSlug passed
 */
export const fetchBookText = async (bookSlug: string): Promise<string> => {
  const filePath = `/${bookSlug}.txt`;
  const response = await fetch(filePath);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();

  return text;
};

/*
 * Sleep function to test loading state
 */
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
