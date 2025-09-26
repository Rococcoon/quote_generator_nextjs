import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.page}>
      <h1>WELCOME</h1>
      <div className={styles.linkContainer}>
        <Link className={styles.linkCard} href={"/quotes"}>QUOTES</Link>
        <Link className={styles.linkCard} href={"/search"}>SEARCH</Link>
      </div>
    </main>
  );
}
