type Quote = string;

export const parseBookText = (bookText: string): Quote[] => {
  return bookText
    .split(/(?<=[.?!])\s+/)
    .filter((quote) => quote.length > 50 && quote.length < 500)
    .map((q) => q.trim());
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
