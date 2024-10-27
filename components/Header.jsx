import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '/styles/Header.module.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className={`
      ${styles.header} 
      ${isScrolled ? styles.scrolled : ''} 
      ${isVisible ? styles.visible : styles.hidden}
      ${isHomePage ? styles.homePage : ''}
    `}>
      <div className={styles.headerContent}>
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
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
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
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;