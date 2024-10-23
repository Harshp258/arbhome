import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '/styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/images/logo.png" 
            alt="Company Logo"
            width={150}
            height={65}
            className={styles.logo}
          />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/services" className={styles.navLink}>Services</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/portfolio" className={styles.navLink}>Portfolio</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.navLink}>About</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/QuoteForm" className={styles.navLink}>Quick Quote</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;