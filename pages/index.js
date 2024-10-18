import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Your Home Staging Company</title>
        <meta name="description" content="Professional home staging services to help sell your property faster" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay}>
            <h1 className={styles.title}>PREMIERE HOME STAGING SERVICES FOR TORONTO & GTA</h1>
            <p className={styles.description}>We transform properties to stand out & sell for more!</p>
            <Link href="/contact" className={styles.cta}>Request Quick Quote</Link>
          </div>
        </section>

        {/* Quote Section */}
                  <section className={styles.quote}>
            <div className={styles.quoteContainer}>
              <h1>
                Looking for a Toronto Home Staging Company?
                <br />
                You've come to the right place!
              </h1>
            </div>
          </section>


        {/* Video Section */}
        <section className={`${styles.section} ${styles.videoSection}`}>
          <video className={styles.heroVideo} autoPlay muted loop controls>
            <source src="/video/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        {/* About Section */}
        <section className={`${styles.section} ${styles.about}`}>
          <h2>Don’t reduce the price, Increase the appeal</h2>
          <p>
            We are a professional Toronto & GTA home staging company, passionate about transforming your home to create mass appeal. Whether you’re a Realtor, Homeowner, Builder, or Investor in Toronto, we can help your listing to get that great first impression!
          </p>
        </section>

        {/* Grid Section */}
        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {/* Our Work */}
            <Link href="/our-work" className={styles.gridItem}>
              <img src="/images/image2.jpg" alt="Our Work" className={styles.image} />
              <div className={styles.textOverlay}>Our Work</div>
            </Link>

            {/* Our Services */}
            <Link href="/services" className={styles.gridItem}>
              <img src="/images/image3.jpg" alt="Our Services" className={styles.image} />
              <div className={styles.textOverlay}>Our Services</div>
            </Link>

            {/* Testimonials */}
            <Link href="/testimonials" className={styles.gridItem}>
              <img src="/images/qw.jpg" alt="Testimonials" className={styles.image} />
              <div className={styles.textOverlay}>Testimonials</div>
            </Link>

            {/* Get a Quote */}
            <Link href="/get-a-quote" className={styles.gridItem}>
              <img src="/images/image5.jpg" alt="Get a Quote" className={styles.image} />
              <div className={styles.textOverlay}>Get a Quote</div>
            </Link>
          </div>
        </section>

        {/* ROI Section */}
        <section className={`${styles.section} ${styles.roi}`}>
          <h2>Why do you want to stage prior to selling? Here’s the proven ARB of home staging:</h2>
          <div className={styles.roiContainer}>
            <div className={styles.roiItem}>
              <h3>Boost Profits</h3>
              <p>Did you know that on average, 86% of staged homes see a 6-25% increase in the final sale price? It’s simple: strategic staging reflects the potential buyer’s desired lifestyle, making them fall in love with the property.</p>
            </div>

            <div className={styles.roiItem}>
              <h3>Faster Sales</h3>
              <p>86% of staged homes sell faster than unstaged homes. In an industry where time is money, home staging is like taking a giant leap over competitors and toward the signing table.</p>
            </div>

            <div className={styles.roiItem}>
              <h3>First Impressions Matter</h3>
              <p>90% of buyers start their home search online, which means high-quality listing photos matter. In fact, 77% of potential buyers could better visualize the property as their future home when staged!</p>
            </div>
          </div>
        </section>

        <div className="adminLink">
          <p>Are you admin?</p>
          <Link href="/admin/login" className="cta">Click here</Link>
        </div>
      </main>
    </div>
  );
}
