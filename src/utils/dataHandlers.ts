import { Quote } from "@/types/books";

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

export const fetchBookText = async (bookSlug: string): Promise<string> => {
  const filePath = `/${bookSlug}.txt`;
  const response = await fetch(filePath);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();

  return text;
};
