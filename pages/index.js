import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from "next/legacy/image";
import styles from '../styles/Home.module.css';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { supabase } from '../lib/supabaseClient';
import { FaHome, FaClock, FaChartLine } from 'react-icons/fa';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id, 
          title,
          staging_type,
          address,
          description,
          project_media
        `)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;

      setProjects(data.map(project => ({
        ...project,
        frontImage: project.project_media && project.project_media.length > 0 
          ? project.project_media[0] 
          : '/images/placeholder.jpg'
      })));
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>ARB Home Staging Group | Toronto&apos;s Premier Home Staging</title>
        <meta name="description" content="Transform your property with ARB Home Staging Group. Professional home staging services in Toronto & GTA to help sell your property faster and for more." />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <main className={`${styles.main} ${styles.homePage}`}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>PREMIERE HOME STAGING SERVICES FOR TORONTO & GTA</h1>
            <p className={styles.description}>We transform properties to stand out & sell for more!</p>
            <Link href="/QuoteForm">
              <span className={styles.cta}>Request Quick Quote</span>
            </Link>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.feature}>
            <FaHome className={styles.featureIcon} />
            <h3>Expert Staging</h3>
            <p>Tailored designs to showcase your property&apos;s full potential</p>
          </div>
          <div className={styles.feature}>
            <FaClock className={styles.featureIcon} />
            <h3>Faster Sales</h3>
            <p>Staged homes sell 73% faster than non-staged homes</p>
          </div>
          <div className={styles.feature}>
            <FaChartLine className={styles.featureIcon} />
            <h3>Higher Value</h3>
            <p>Increase your property&apos;s perceived value by up to 20%</p>
          </div>
        </section>

        <section className={styles.quote}>
          <div className={styles.quoteContainer}>
            <h2>
              Looking for a Toronto Home Staging Company?
              <br />
              You&apos;ve come to the right place!
            </h2>
          </div>
        </section>

        <section id="ourWorkSection" className={styles.ourWorkSection}>
          <h2>Our Work</h2>
          {loading ? (
            <div>Loading projects...</div>
          ) : (
            <div className={styles.projectGrid}>
              {projects.map((project) => (
                <Link href={`/projects/${project.id}`} key={project.id}>
                  <div className={styles.projectCard}>
                    <div className={styles.projectImageContainer}>
                      <Image 
                        src={project.frontImage} 
                        alt={project.title} 
                        layout="fill" 
                        objectFit="cover"
                        className={styles.projectImage}
                      />
                    </div>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className={styles.videoSection}>
          <video className={styles.heroVideo} autoPlay muted loop playsInline>
            <source src="/video/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        <section className={styles.about}>
          <h2>Don&apos;t reduce the price, Increase the appeal</h2>
          <p>
            We are a professional Toronto & GTA home staging company, passionate about transforming your home to create mass appeal. Whether you&apos;re a Realtor, Homeowner, Builder, or Investor in Toronto, we can help your listing to get that great first impression!
          </p>
        </section>

                                <section className={styles.gridSection}>
                                    <div className={styles.grid}>
                                      <Link href="#ourWorkSection">
                                        <div className={styles.gridItem}>
                                          <Image src="/images/image2.jpg" alt="Our Work" layout="fill" objectFit="cover" />
                                          <div className={styles.textOverlay}>Our Work</div>
                                        </div>
                                      </Link>

                                      <Link href="/services">
                                        <div className={styles.gridItem}>
                                          <Image src="/images/image3.jpg" alt="Our Services" layout="fill" objectFit="cover" />
                                          <div className={styles.textOverlay}>Our Services</div>
                                        </div>
                                      </Link>

                                      <Link href="/about">
                                        <div className={styles.gridItem}>
                                          <Image src="/images/qw.jpg" alt="About Us" layout="fill" objectFit="cover" />
                                          <div className={styles.textOverlay}>About Us</div>
                                        </div>
                                      </Link>

                                      <Link href="/QuoteForm">
                                        <div className={styles.gridItem}>
                                          <Image src="/images/image5.jpg" alt="Get a Quote" layout="fill" objectFit="cover" />
                                          <div className={styles.textOverlay}>Get a Quote</div>
                                        </div>
                                      </Link>
                                    </div>
                                  </section>


                <section className={styles.testimonialSection}>
                  <h2>What Our Clients Say</h2>
                  <div className={styles.testimonialContainer}>
                    <div className={styles.testimonial}>
                      <div className={styles.testimonialContent}>
                        <p>&quot;ARB Home Staging transformed our property beyond our wildest dreams. It sold within a week for above asking price!&quot;</p>
                        <div className={styles.testimonialAuthor}>
                          <Image src="/images/img10.jpg" alt="Sarah M." width={60} height={60} className={styles.authorImage} />
                          <div>
                            <h4>Sarah M.</h4>
                            <p>Toronto Homeowner</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.testimonial}>
                      <div className={styles.testimonialContent}>
                        <p>&quot;The attention to detail and professionalism of ARB Home Staging is unmatched. They truly understand the Toronto market.&quot;</p>
                        <div className={styles.testimonialAuthor}>
                          <Image src="/images/img15.jpg" alt="John D." width={60} height={60} className={styles.authorImage} />
                          <div>
                            <h4>John D.</h4>
                            <p>Real Estate Agent</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.googleCertified}>
                    <Image src="/images/google.png" alt="Google Certified" width={210} height={70} />
                    <p>Certified Home Staging Company</p>
                  </div>
                </section>

        <section className={styles.roi}>
          <h2>Why do you want to stage prior to selling? Here&apos;s the proven ARB of home staging:</h2>
          <div className={styles.roiContainer}>
            <div className={styles.roiItem}>
              <h3>Boost Profits</h3>
              <p>Did you know that on average, 86% of staged homes see a 6-25% increase in the final sale price? It&apos;s simple: strategic staging reflects the potential buyer&apos;s desired lifestyle, making them fall in love with the property.</p>
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

        <section className={styles.beforeAfterSection}>
        <h2>The ARB Transformation</h2>
        <div className={styles.beforeAfterContainer}>
          <BeforeAfterSlider 
            beforeImage="/images/Before1.png"
            afterImage="/images/after1.png"
            alt="Living Room Transformation"
          />
          <BeforeAfterSlider 
            beforeImage="/images/before3.png"
            afterImage="/images/after3.png"
            alt="Living Room Transformation"
          />
        </div>
      </section>



               <section className={styles.ctaSection}>
                <div className={styles.ctaOverlay}>
                  <h2>Ready to Transform Your Property?</h2>
                  <p>Let&apos;s create a space that buyers can&apos;t resist.</p>
                  <Link href="/QuoteForm">
                    <span className={styles.cta}>Get Started Today</span>
                  </Link>
                </div>
              </section>
      </main>
    </div>
  );
}