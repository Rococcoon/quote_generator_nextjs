'use client'

import styles from "./searchList.module.css";
import { Quote } from "@/types/books";

type QuoteGenProps = {
  quotes: Quote[];
};

/*
 * component to render the filtered list of quotes
 */
const SearchList: React.FC<QuoteGenProps> = ({ quotes }) => {

  return (
    <div className={styles.container}>
      <ul>
        {quotes.map((quote: Quote, i: number) => (
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
};

export default SearchList;
