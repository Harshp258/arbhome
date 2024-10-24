import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import styles from '/styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.leftSection}>
          <h3 className={styles.heading}>Connect With Us</h3>
          <ul className={styles.socialList}>
            <li>
              <a href="https://www.facebook.com/people/ARB-Home-Staging/61563843639418/" target="_blank" rel="noopener noreferrer">
                <FaFacebook className={styles.icon} />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/arbhomestaging/?hl=en" target="_blank" rel="noopener noreferrer">
                <FaInstagram className={styles.icon} />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 ARB Home Staging. All rights reserved.</p>
            <Link href="/admin/login" className={styles.adminLink}>Are you an admin?
            </Link>
          </div>
        </div>
        <div className={styles.rightSection}>
          <h3 className={styles.heading}>Contact Information</h3>
          <ul className={styles.contactList}>
            <li>
              <FaEnvelope className={styles.icon} />
              <a href="mailto:arbhomestaging904@gmail.com">arbhomestaging904@gmail.com</a>
            </li>
            <li>
              <FaPhone className={styles.icon} />
              <a href="tel:+16479614352">+1 (647) 961-4352</a>
            </li>
            <li>
              <FaMapMarkerAlt className={styles.icon} />
              <span>98 Yardley Crescent Brampton, ON, L6X5L8</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;