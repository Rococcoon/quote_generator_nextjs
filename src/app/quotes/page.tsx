import styles from "./page.module.css";

import QuoteGen from "@/components/quoteGen/quoteGen";

export default function Home() {
  return (
    <main className={styles.main}>
      <QuoteGen />
    </main>
  );
}
