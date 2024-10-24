import React from 'react';
import styles from '/styles/Footer.module.css';



const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialMedia}>
        <h3 className={styles.heading}>Follow Us</h3>
        <ul className={styles.socialList}>
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
      <div className={styles.contactInfo}>
        <h3 className={styles.heading}>Contact Us</h3>
        <p>Email: <a href="mailto:arbhomestaging904@gmail.com.com">info@example.com</a></p>
        <p>Phone: <a href="tel:+16479614352">+1 (647) 961-4352</a></p>
        <p>Address: 123 Staging Ave, Suite 100, City, State, ZIP</p>
      </div>
    </footer>
  );
};

export default Footer;