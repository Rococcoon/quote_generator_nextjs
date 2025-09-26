import React, { FC } from "react";

type Book = {
  title: string;
  slug: string;
};

const BookList: FC = () => {

  const books: Book[] = []

  return (
    <div>
      <header>
        <h1>Select Your Book!</h1>
      </header>
    </div>
  )
}

export default BookList
