import React, { FC } from "react";
import styles from "./header.module.css";
import Link from 'next/link';

type NavLinks = {
  title: string;
  path: string;
}

const Header: FC = () => {

  const links: NavLinks[] = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Quotes",
      path: "/quotes",
    },
    {
      title: "Search",
      path: "/search",
    },
  ]

  return (
    <header className={styles.headerContainer}>
      <h1><Link href="/">QUOTES!!!</Link></h1>
      <nav>
        <ul className={styles.navUl}>
          {links.map((link) => (
            <li
              className={styles.navLink}
              key={link.path}
            >
              <a href={link.path}>{link.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header >
  )
}

export default Header;
