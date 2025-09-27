'use client'

import React, { useState, useEffect, useCallback } from 'react';
import styles from "./quoteGen.module.css";
import { Book } from "@/types/books";
import { fetchBookText, parseBookText } from "@/utils/dataHandlers";
import { Quote } from "@/types/books";

type AppState = 'LOADING' | 'SUCCESS' | 'ERROR';

type QuoteGenProps = {
  book: Book;
};

const QuoteGen: React.FC<QuoteGenProps> = ({ book }) => {
  const { title, bookSlug } = book;

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<string>('');
  const [appState, setAppState] = useState<AppState>('LOADING');

  /*
   * Function to handle new quote button click
   * it gets a random quote from the quotes array then 
   * sets the currentQuote to it
   */
  const handleNewQuote = useCallback(() => {
    if (quotes.length === 0) return;
    const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomQuoteIndex].quote);
  }, [quotes]);

  /*
   * this useEffect function fetchs the .txt file based on the bookSlug 
   * passed to the component
   * it then parses the string into an array of quotes
   * it then sets the quotes array to the parsed array of quotes
   */
  useEffect(() => {
    const fetchAndParse = async () => {
      setAppState('LOADING');

      try {
        const text = await fetchBookText(bookSlug);

        const parsedQuotes = parseBookText(text);

        setQuotes(parsedQuotes);
        setAppState('SUCCESS');

      } catch (error) {
        console.error(`Could not fetch or parse the book at /${bookSlug}.txt:`, error);
        setAppState('ERROR');
      }
    };

    fetchAndParse();

  }, [bookSlug]);

  /*
   * sets a new quote whenever the state changes
   * this is so there is always a quote displayed
   */
  useEffect(() => {
    if (appState === 'SUCCESS' && quotes.length > 0) {
      handleNewQuote();
    }
  }, [appState, quotes.length, handleNewQuote]);

  /*
   * determin what to render based on the appstate
   */
  const renderContent = () => {
    switch (appState) {
      case 'LOADING':
        return (
          <div className={styles.loadingText}>Loading {title}...</div>
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
