import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Services.module.css';

export default function Services() {
  return (
    <div className={styles.servicesContainer}>
      <Head>
        <title>Services - ARB Staging</title>
        <meta name="description" content="Home staging services offered by ARB Staging." />
      </Head>
      
      <h1 className={styles.title}>Services</h1>
      <h2 className={styles.subtitle}>
        Here is a list of home staging services that we provide for your real estate needs.
      </h2>
      <p className={styles.description}>
        Everything we do is designed to get you the ultimate results. Our on-trend inventory and amazing styling skills 
        are loved by today’s buyers. Our Toronto-based home staging company, ARB Staging, is your one-stop resource 
        for home staging and preparing your listing to stand out. Homes that look best, sell fastest, and for the most 
        money. We stage vacant homes, occupied homes, investment properties, and also provide free home consultation 
        and interior redesign. Let us help you prepare your house for sale today!
      </p>
      
      {/* Services Section */}
      <div className={styles.servicesGrid}>
        {/* Service 1 */}
        <div className={styles.serviceCard} style={{ backgroundImage: "url('/images/img6.jpeg')" }}>
          <h3 className={styles.serviceTitle}>Home Consultation</h3>
          <p className={styles.serviceDescription}>
            We provide in-home or virtual staging consultation with the homeowner to help them prepare their property 
            for the listing. During this process, we take measurements, pictures, and create a detailed action plan 
            for review.
          </p>
        </div>

        {/* Service 2 */}
        <div className={styles.serviceCard} style={{ backgroundImage: "url('/images/img 12.JPG')" }}>
          <h3 className={styles.serviceTitle}>Occupied Home Staging</h3>
          <p className={styles.serviceDescription}>
            We work with your existing furnishings where possible while adding essential accent furniture, accessories, 
            and décor that will make your home look warm, elegant, and desirable to potential buyers.
          </p>
        </div>

        {/* Service 3 */}
        <div className={styles.serviceCard} style={{ backgroundImage: "url('/images/img8.JPG')" }}>
          <h3 className={styles.serviceTitle}>Vacant Home Staging</h3>
          <p className={styles.serviceDescription}>
            For vacant properties, we provide all the essential furnishings, lighting, and accessories to help buyers 
            visualize the home they want to live in. Our turnkey solution will transform your home from an empty space 
            into a highly desirable model home in a single day!
          </p>
        </div>

        {/* Service 4 */}
        <div className={styles.serviceCard} style={{ backgroundImage: "url('/images/img10.JPG')" }}>
          <h3 className={styles.serviceTitle}>Interior Redesign</h3>
          <p className={styles.serviceDescription}>
            Our interior redesign services help you transform your home into a space that is welcoming, trendy, 
            attractive, yet functional for you and your loved ones.
          </p>
        </div>
      </div>

      {/* How It Works Image */}
      <div className={styles.howItWorksSection}>
        <Image 
          src="/images/HIT.png"  // Replace this with the correct path to your image
          alt="How It Works" 
          width={710} 
          height={1800} 
          className={styles.howItWorksImage}
        />
      </div>

      {/* Quick Chat Section */}
      <div className={styles.quickChatSection}>
        <h1 className={styles.quickChatHeader}>Ready for a quick chat?</h1>
        <a href="tel:+1234567890" className={styles.callUsButton}>Call Us</a>
      </div>
    </div>
  );
}
