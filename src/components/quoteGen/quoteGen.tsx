'use client'

import React, { useState, useEffect, useCallback } from 'react';
import styles from "./quoteGen.module.css";

type AppState = 'LOADING' | 'SUCCESS' | 'ERROR';
type Chapter = {
  number: number;
  quotes: string[];
};

// Define the component's props
type QuoteGenProps = {
  bookSlug: string; // e.g., 'moby-dick', 'pride-and-prejudice'
};

const parseBookText = (text: string): Chapter[] => {
  // Regex to match Roman numerals (I, II, III, etc.) followed by one or more newline characters
  // This will capture the numeral on its own line.
  const chapterStartRegex = /(I|V|X|L|C|D|M)+\n+/g; // Matches "I" followed by at least one newline.

  const chaptersWithQuotes: Chapter[] = [];
  const chapterMatches = [...text.matchAll(chapterStartRegex)];

  for (let i = 0; i < chapterMatches.length; i++) {
    // start is the position *after* the Roman numeral and its newlines
    const start = (chapterMatches[i].index as number) + chapterMatches[i][0].length;

    // end is the position where the next chapter starts, or the end of the file
    const end = i + 1 < chapterMatches.length ? chapterMatches[i + 1].index as number : text.length;

    // The "chapter text" will now include the title line ("THE RIVER BANK")
    const chapterText = text.substring(start, end);

    // ... (rest of the quote splitting and filtering is the same)
    const quotes = chapterText
      .split(/(?<=[.?!])\s+/)
      .filter(quote => quote.length > 50 && quote.length < 500);

    if (quotes.length > 0) {
      chaptersWithQuotes.push({
        number: i + 1, // Still using index + 1 for chapter number
        quotes: quotes.map(q => q.trim()),
      });
    }
  }

  return chaptersWithQuotes;
};

// Update the component to accept the prop
const QuoteGen: React.FC<QuoteGenProps> = ({ bookSlug }) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentQuote, setCurrentQuote] = useState<string>('');
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const [appState, setAppState] = useState<AppState>('LOADING');

  // Memoize handleNewQuote
  const handleNewQuote = useCallback(() => {
    if (chapters.length === 0) return;

    const randomChapterIndex = Math.floor(Math.random() * chapters.length);
    const selectedChapter = chapters[randomChapterIndex];

    if (selectedChapter.quotes.length > 0) {
      const randomQuoteIndex = Math.floor(Math.random() * selectedChapter.quotes.length);
      setCurrentQuote(selectedChapter.quotes[randomQuoteIndex]);
      setCurrentChapter(selectedChapter.number);
    }
  }, [chapters]);

  // Update the useEffect to use bookSlug
  useEffect(() => {
    // Construct the file path using the prop
    const filePath = `/${bookSlug}.txt`;

    const fetchAndParseBook = async () => {
      setAppState('LOADING'); // Reset state when prop changes
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();

        const parsedChapters = parseBookText(text);

        setChapters(parsedChapters);
        setAppState('SUCCESS');
      } catch (error) {
        console.error(`Could not fetch or parse the book at ${filePath}:`, error);
        setAppState('ERROR');
      }
    };

    fetchAndParseBook();
  }, [bookSlug]); // Dependency is now bookSlug

  // Effect to generate the first quote
  useEffect(() => {
    if (appState === 'SUCCESS') {
      handleNewQuote();
    }
  }, [appState, handleNewQuote]);

  // Update renderContent to be more generic
  const renderContent = () => {
    switch (appState) {
      case 'LOADING':
        return (
          <div>Loading **{bookSlug.replace(/-/g, ' ')}**...</div>
        );
      case 'ERROR':
        return (
          <div>
            Error loading book. Please ensure **'{bookSlug}.txt'** is in your public directory.
          </div>
        );
      case 'SUCCESS':
        return (
          <div className={styles.quoteCard}>
            {currentChapter &&
              <div className={styles.chapterTitle}>
                From Chapter **{currentChapter}**
              </div>}
            <blockquote className={styles.quoteBox}>
              <p>"{currentQuote || "Click the button to get your first quote!"}"</p>
            </blockquote>
            <button
              className={styles.generateButton}
              onClick={handleNewQuote}
            >
              Generate New Quote
            </button>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      {/* Capitalize and format the title dynamically */}
      <h1>
        {bookSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Quote Generator
      </h1>
      {renderContent()}
    </div>
  );
};

export default QuoteGen;
