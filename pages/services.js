import React from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Services.module.css';

export default function Services() {
  return (
    <div className={styles.servicesContainer}>
      <h1 className={styles.title}>Services</h1>
      <h2 className={styles.subtitle}>
        Here are a list of home staging services that we provide for your real estate needs.
      </h2>
      
      <div className={styles.servicesGrid}>
        {/* Service 1 */}
        <div className={styles.serviceCard}>
          <img src="/icons/home-consultation.png" alt="Home Consultation" className={styles.icon} />
          <h3 className={styles.serviceTitle}>Home Consultation</h3>
          <p className={styles.serviceDescription}>
            We provide in-home or virtual staging consultation with the homeowner to help them prepare their property 
            for the listing. During this process, we take measurements, pictures and draw a detailed action plan for review.
          </p>
        </div>

        {/* Service 2 */}
        <div className={styles.serviceCard}>
          <img src="/icons/occupied-staging.png" alt="Occupied Home Staging" className={styles.icon} />
          <h3 className={styles.serviceTitle}>Occupied Home Staging</h3>
          <p className={styles.serviceDescription}>
            We work with your existing furnishing where possible while adding essential accent furniture, accessories, 
            and decors that will make your home look warm, elegant, and desirable to potential buyers.
          </p>
        </div>

        {/* Service 3 */}
        <div className={styles.serviceCard}>
          <img src="/icons/vacant-staging.png" alt="Vacant Home Staging" className={styles.icon} />
          <h3 className={styles.serviceTitle}>Vacant Home Staging</h3>
          <p className={styles.serviceDescription}>
            For vacant properties, we provide all the essential furnishing, lighting, and accessories to help the buyers 
            visualize the home they want to live in. Our turnkey solution will transform your home from an empty space 
            into a highly desirable model home within a single day!
          </p>
        </div>

        {/* Service 4 */}
        <div className={styles.serviceCard}>
          <img src="/icons/interior-redesign.png" alt="Interior Redesign" className={styles.icon} />
          <h3 className={styles.serviceTitle}>Interior Redesign</h3>
          <p className={styles.serviceDescription}>
            Through our interior redesign services, we help you transform your home into a space that is welcoming, trendy, 
            attractive yet functional for you and your loved ones.
          </p>
        </div>
      </div>
    </div>
  );
}
