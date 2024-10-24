import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '/styles/Header.module.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false); // Initialize to false for hidden state
  let lastScrollY = 0; // To store the last scroll position

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY; // Get current scroll position

      // Check if scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide header when scrolling down
      } else if (currentScrollY < lastScrollY) {
        // Only show header if scrolling up and not at the top
        if (currentScrollY < 200) {
          setIsVisible(true); // Show header when scrolling back up near the top
        }
      }

      lastScrollY = currentScrollY; // Update last scroll position
    }
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Cleanup the scroll event listener
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}>
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
