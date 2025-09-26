import React, { FC } from "react";
import styles from "./header.module.css";

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
    // {
    //   title: "Form",
    //   path: "/form",
    // },
    // {
    //   title: "Filter",
    //   path: "/filter",
    // },
    // {
    //   title: "Hover",
    //   path: "/hover",
    // },
  ]

  return (
    <header className={styles.headerContainer}>
      <h1>Moby Dick</h1>
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
