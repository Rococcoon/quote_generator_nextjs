import styles from "./page.module.css";

import BookList from "@/components/search/bookList/bookList";

export default function Home() {
  return (
    <main className={styles.main}>
      <BookList />
    </main>
  );
}
