import React from 'react';
import Head from 'next/head';
import Image from "next/legacy/image";
import styles from '../styles/Services.module.css';

export default function Services() {
  return (
    <>
    <br />
    <br />
    <br />
    <br />
    <div className={styles.servicesContainer}>
      <Head>
        <title>Services - ARB Staging</title>
        <meta name="description" content="Home staging services offered by ARB Staging." />
      </Head>
      
      <section className={styles.hero}>
        <h1 className={styles.title}>Our Services</h1>
        <p className={styles.subtitle}>
          Transforming spaces, elevating value - Your one-stop resource for premium home staging.
        </p>
      </section>

      <section className={styles.introSection}>
        <p className={styles.description}>
          At ARB Staging, we specialize in creating captivating spaces that sell. Our on-trend inventory and expert styling 
          skills are designed to appeal to today&apos;s discerning buyers. From vacant homes to occupied properties, we offer 
          comprehensive staging solutions that help your listing stand out in the competitive Toronto real estate market.
        </p>
      </section>
      
      <section className={styles.servicesGrid}>
        <div className={styles.serviceCard}>
          <div className={styles.serviceContent}>
            <h3 className={styles.serviceTitle}>Home Consultation</h3>
            <p className={styles.serviceDescription}>
              Personalized in-home or virtual staging consultations to prepare your property for listing. We provide 
              detailed action plans based on thorough assessments and professional insights.
            </p>
          </div>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceContent}>
            <h3 className={styles.serviceTitle}>Occupied Home Staging</h3>
            <p className={styles.serviceDescription}>
              We enhance your existing furnishings with carefully selected accent pieces, creating a warm and elegant 
              atmosphere that resonates with potential buyers.
            </p>
          </div>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceContent}>
            <h3 className={styles.serviceTitle}>Vacant Home Staging</h3>
            <p className={styles.serviceDescription}>
              Transform empty spaces into inviting homes. Our turnkey solution provides all essential furnishings and 
              decor, creating a highly desirable living environment in just one day.
            </p>
          </div>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceContent}>
            <h3 className={styles.serviceTitle}>Interior Redesign</h3>
            <p className={styles.serviceDescription}>
              Revitalize your living space with our interior redesign services. We create welcoming, trendy, and 
              functional environments tailored to your lifestyle and preferences.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.howItWorksSection}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <Image 
          src="/images/HIT.png"
          alt="How It Works" 
          width={710} 
          height={1800} 
          className={styles.howItWorksImage}
        />
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Transform Your Space?</h2>
        <a href="tel:+16479614352" className={styles.ctaButton}>Schedule a Consultation</a>
      </section>
    </div>
    </>
  );
}