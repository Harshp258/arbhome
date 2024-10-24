import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import styles from '/styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialMedia}>
        <h3 className={styles.heading}>Follow Us</h3>
        <ul className={styles.socialList}>
          <li>
            <a href="https://www.facebook.com/people/ARB-Home-Staging/61563843639418/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className={styles.icon} /> Facebook
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/arbhomestaging/?hl=en" target="_blank" rel="noopener noreferrer">
              <FaInstagram  className={styles.icon} /> Instagram
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.contactInfo}>
        <h3 className={styles.heading}>Contact Us</h3>
        <p>Email: <a href="mailto:arbhomestaging904@gmail.com">arbhomestaging904@gmail.com</a></p>
        <p>Phone: <a href="tel:(647) 961-4352">+1 (647) 961-4352</a></p>
        <p>Address: 98 Yardley Crescent Brampton, ON, L6X5L8</p>
      </div>
    </footer>
  );
};

export default Footer;
