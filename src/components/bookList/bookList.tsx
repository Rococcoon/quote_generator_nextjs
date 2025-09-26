'use client'

import React, { FC, useState } from "react";
import styles from "./bookList.module.css";
import QuoteGen from "@/components/quoteGen/quoteGen";
import { Book } from "@/types/books";


const BookList: FC = () => {
  const [listState, setListState] = useState<boolean>(true);
  const [curBook, setCurBook] = useState<Book | null>(null);

  const books: Book[] = [
    {
      title: "Peter Pan",
      bookSlug: "peter-pan",
    },
    {
      title: "Moby Dick",
      bookSlug: "moby-dick",
    },
    {
      title: "Winnie the Pooh",
      bookSlug: "winnie-the-pooh",
    },
    {
      title: "The Wind and the Willows",
      bookSlug: "the-wind-and-the-willows",
    },
    {
      title: "A Christmas Carol",
      bookSlug: "a-christmas-carol",
    },
    {
      title: "Gullivers Travels",
      bookSlug: "gullivers-travels",
    }
  ]

  const handleListItemClick = (book: Book) => {
    setListState(false);
    setCurBook(book);
  }

  return (
    <div>
      {listState === true ? (
        <div>
          <h1>Select Your Book!</h1>
          <ul className={styles.bookList}>
            {books.map((book) => {
              return (
                <li
                  className={styles.bookCard}
                  key={book.bookSlug}
                  onClick={() => handleListItemClick(book)}
                >
                  <h3>{book.title}</h3>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        curBook && (
          <div>
            <button
              className={styles.backBtn}
              onClick={() => setListState(true)}
            >
              BACK
            </button>
            <QuoteGen book={curBook} />
          </div>
        )
      )}
    </div >
  );

}

export default BookList;
