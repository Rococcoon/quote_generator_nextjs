'use client'

import React, { useState, useEffect, useCallback } from 'react';
import styles from "./quoteGen.module.css";
import { Book } from "@/types/books";

type AppState = 'LOADING' | 'SUCCESS' | 'ERROR';

type Quote = string;

type QuoteGenProps = {
  book: Book;
};

const simpleParseBookText = (bookText: string): Quote[] => {
  return bookText
    .split(/(?<=[.?!])\s+/)
    .filter(quote => quote.length > 50 && quote.length < 500)
    .map(q => q.trim());
};

const QuoteGen: React.FC<QuoteGenProps> = ({ book }) => {
  const { title, bookSlug } = book;

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<string>('');
  const [appState, setAppState] = useState<AppState>('LOADING');

  const handleNewQuote = useCallback(() => {
    if (quotes.length === 0) return;

    const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomQuoteIndex]);
  }, [quotes]);

  useEffect(() => {
    const filePath = `/${bookSlug}.txt`;

    const fetchAndParseBook = async () => {
      setAppState('LOADING');
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const parsedQuotes = simpleParseBookText(text);

        setQuotes(parsedQuotes);
        setAppState('SUCCESS');
      } catch (error) {
        console.error(`Could not fetch or parse the book at ${filePath}:`, error);
        setAppState('ERROR');
      }
    };

    fetchAndParseBook();
  }, [bookSlug]);

  useEffect(() => {
    if (appState === 'SUCCESS' && quotes.length > 0) {
      handleNewQuote();
    }
  }, [appState, quotes.length, handleNewQuote]);

  const renderContent = () => {
    switch (appState) {
      case 'LOADING':
        return (
          <div>Loading **{title}**...</div>
        );
      case 'ERROR':
        return (
          <div>
            Error loading book. Please ensure '{bookSlug}.txt' is in your public directory.
          </div>
        );
      case 'SUCCESS':
        return (
          <div className={styles.quoteCard}>
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
      <h1>
        {title} Quote Generator
      </h1>
      {renderContent()}
    </div>
  );
};

export default QuoteGen;
