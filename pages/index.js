import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('id, title, images(cloudinary_url)')
      .order('created_at', { ascending: false })
      .limit(4);  // Limit to 4 projects for the homepage
    
    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data.map(project => ({
        ...project,
        frontImage: project.images[0]?.cloudinary_url || '/images/placeholder.jpg'
      })));
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>ARB Home Staging Group</title>
        <meta name="description" content="Professional home staging services to help sell your property faster" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay}>
            <h1 className={styles.title}>PREMIERE HOME STAGING SERVICES FOR TORONTO & GTA</h1>
            <p className={styles.description}>We transform properties to stand out & sell for more!</p>
            <Link href="/QuoteForm" className={styles.cta}>
              Request Quick Quote
            </Link>
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
          <h2>Don't reduce the price, Increase the appeal</h2>
          <p>
            We are a professional Toronto & GTA home staging company, passionate about transforming your home to create mass appeal. Whether you're a Realtor, Homeowner, Builder, or Investor in Toronto, we can help your listing to get that great first impression!
          </p>
        </section>

        {/* Grid Section */}
        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {/* Our Work */}
            <Link href="/our-work" className={styles.gridItem}>
              <Image src="/images/image2.jpg" alt="Our Work" layout="fill" objectFit="cover" />
              <div className={styles.textOverlay}>Our Work</div>
            </Link>

            {/* Our Services */}
            <Link href="/services" className={styles.gridItem}>
              <Image src="/images/image3.jpg" alt="Our Services" layout="fill" objectFit="cover" />
              <div className={styles.textOverlay}>Our Services</div>
            </Link>

            {/* Testimonials */}
            <Link href="/testimonials" className={styles.gridItem}>
              <Image src="/images/qw.jpg" alt="Testimonials" layout="fill" objectFit="cover" />
              <div className={styles.textOverlay}>Testimonials</div>
            </Link>

            {/* Get a Quote */}
            <Link href="/get-a-quote" className={styles.gridItem}>
              <Image src="/images/image5.jpg" alt="Get a Quote" layout="fill" objectFit="cover" />
              <div className={styles.textOverlay}>Get a Quote</div>
            </Link>
          </div>
        </section>

       {/* Our Work Section */}
       
        <section className={styles.ourWorkSection}>
          <h2>Our Work</h2>
          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id} className={styles.projectCard}>
                <Image 
                  src={project.frontImage} 
                  alt={project.title} 
                  layout="fill" 
                  objectFit="cover"
                  className={styles.projectImage}
                />
                <h3 className={styles.projectTitle}>{project.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}