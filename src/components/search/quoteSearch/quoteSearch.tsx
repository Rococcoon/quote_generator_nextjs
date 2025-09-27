'use client'

import React, { useState, useEffect } from 'react';
import styles from "./quoteSearch.module.css";
import { Book } from "@/types/books";
import { fetchBookText, parseBookText, sleep } from "@/utils/dataHandlers";
import { Quote } from "@/types/books";

type AppState = 'LOADING' | 'SUCCESS' | 'ERROR';

type QuoteGenProps = {
  book: Book;
};

const QuoteSearch: React.FC<QuoteGenProps> = ({ book }) => {
  const { title, bookSlug } = book;

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [appState, setAppState] = useState<AppState>('LOADING');

  /*
   * This useEffect runs when the component is passed its parameters
   * The function fetches the .txt file based on the bookSlug
   * It parses the .txt into an array of quotes
   * It then sets the quotes and filteredQuotes state to the array of quotes
   */
  useEffect(() => {
    const fetchAndParse = async () => {
      setAppState('LOADING');

      try {
        const text = await fetchBookText(bookSlug);

        const parsedQuotes = parseBookText(text);

        await sleep(2000);

        setQuotes(parsedQuotes);
        setFilteredQuotes(parsedQuotes);
        setAppState('SUCCESS');

      } catch (error) {
        console.error(`Could not fetch or parse the book at /${bookSlug}.txt:`, error);
        setAppState('ERROR');
      }
    };

    fetchAndParse();

  }, [bookSlug]);

  /*
   * This function takes the input from the form element for searching
   * It the uses the input to filter the FilteredQuotes array and set
   * the new filteredQuotes array to the filtered content
   */
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newSearchTerm: string = event.target.value;

    setFilteredQuotes(quotes.filter((quote) =>
      quote.quote.toLowerCase().includes(newSearchTerm.toLowerCase())
    ));
  }

  /*
   * This function returns jsx to be rendered in the browser based on the 
   * state of the appstate of the component
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
            <form
              onSubmit={e => e.preventDefault()}
              className={styles.searchForm}
              role="search"
            >
              <label htmlFor="search-input">Search:</label>
              <input
                type="search"
                id="search-input"
                name="search"
                onChange={handleSearchInput}
                placeholder="Search..."
              />
            </form>
            <ul>
              {filteredQuotes.map((quote, i) => (
                <li
                  className={styles.quoteBox}
                  key={i}
                >
                  {quote.quote}
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <h1>
        {title} Quote Searcher
      </h1>
      {renderContent()}
    </div>
  );
};

export default QuoteSearch;
