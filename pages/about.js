import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import styles from '../styles/about.module.css';

const Section = ({ title, children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className={`${styles.section} ${inView ? styles.visible : ''}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.heroSection}>
        <Image 
          src="/images/owner.jpeg" 
          alt="Bhavika Patel"
          width={300}
          height={300}
          className={styles.ownerImage}
        />
        <div className={styles.heroText}>
          <h1>Bhavika Patel</h1>
          <h2>Transforming Spaces, Inspiring Sales</h2>
        </div>
      </div>

      <Section title="About Us">
        <p>Welcome to ARB Home Staging, your premier home staging service dedicated to transforming properties into inviting, market-ready homes. With a keen eye for design and a deep understanding of the real estate market, we specialize in creating spaces that resonate with potential buyers, ensuring your property stands out and sells quickly.</p>
      </Section>

      <Section title="Our Mission">
        <p>At ARB Home Staging, our mission is to enhance the visual appeal of every home we stage, helping sellers achieve their goals and providing buyers with a vision of their future home. We believe that first impressions matter, and our goal is to create a lasting impact through thoughtful and stylish staging.</p>
      </Section>

      <Section title="Our Services">
        <ul>
          <li><strong>Consultation:</strong> We begin with an in-depth consultation to understand your needs and the unique features of your property.</li>
          <li><strong>Staging:</strong> Using our extensive inventory of furniture, art, and accessories, we create a cohesive and attractive design tailored to your home's style.</li>
          <li><strong>Photography:</strong> We provide professional photography to capture the staged home at its best, enhancing online listings and marketing materials.</li>
          <li><strong>De-staging:</strong> Once your property is sold, we efficiently remove all staging items, leaving the home ready for its new owners.</li>
        </ul>
      </Section>

      <Section title="Why Choose Us?">
        <ul>
          <li><strong>Experience:</strong> With over 2 years in the home staging industry, we have the expertise to showcase your property in the best light.</li>
          <li><strong>Personalized Service:</strong> We understand that every home is unique, and we tailor our staging to highlight its best features.</li>
          <li><strong>Quality:</strong> We use high-quality furniture and décor to ensure a sophisticated and appealing presentation.</li>
          <li><strong>Results:</strong> Our staged homes sell faster and often for a higher price, maximizing your return on investment.</li>
        </ul>
      </Section>

      <Section title="Our Team">
        <p>Our team is composed of talented and dedicated professionals who are passionate about design and real estate. We work collaboratively to ensure every project is executed flawlessly, paying attention to every detail to create a polished and inviting space.</p>
      </Section>

      <div className={styles.contactSection}>
        <h2>Contact Us</h2>
        <p>Ready to transform your property and achieve your selling goals? Contact us today to schedule a consultation and see how ARB Home Staging can make a difference in your home sale.</p>
        <a href="/quote" className={styles.quoteLink}>Get a Quick Quote</a>
      </div>
    </div>
  );
}