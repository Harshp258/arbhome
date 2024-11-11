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
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`
      ${styles.header} 
      ${isScrolled ? styles.scrolled : ''} 
      ${isVisible ? styles.visible : styles.hidden}
      ${isHomePage ? styles.homePage : ''}
      ${isMenuOpen ? styles.menuOpen : ''}
    `}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              src="/images/logo.png" 
              alt="Company Logo"
              width={200}
              height={90}
              className={styles.logo}
            />
          </Link>
        </div>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink} onClick={closeMenu}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/services" className={styles.navLink} onClick={closeMenu}>Services</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about" className={styles.navLink} onClick={closeMenu}>About</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/QuoteForm" className={styles.navLink} onClick={closeMenu}>Quick Quote</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {isMenuOpen && isMobile && (
          <button className={styles.closeButton} onClick={closeMenu}>
            &times;
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;