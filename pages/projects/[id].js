import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/ProjectDetail.module.css';
import Image from "next/legacy/image";
import { FaHome, FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  const fetchProjectDetails = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setProject(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project details:', error);
      setError('Failed to load project details');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id, fetchProjectDetails]);


  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!project) return <div className={styles.notFound}>Project not found</div>;

  const projectMedia = project.project_media || [];
  const images = projectMedia.filter(url => !url.includes('video'));
  const video = projectMedia.find(url => url.includes('video'));

  return (
    <>
    <br />
    <br />
    <br />
    <br />
    <br />
    <div className={styles.projectDetail}>
      <div className={styles.heroSection}>
        {video ? (
          <video autoPlay loop muted playsInline className={styles.heroVideo}>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image 
            src={images[0] || '/placeholder-image.jpg'} 
            alt={project.title}
            layout="fill"
            objectFit="cover"
            priority
          />
        )}
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{project.title}</h1>
          <div className={styles.infoSection}>
            <div className={styles.infoItem}>
              <FaHome className={styles.icon} />
              <span>{project.staging_type}</span>
            </div>
            <div className={styles.infoItem}>
              <FaMapMarkerAlt className={styles.icon} />
              <span>{project.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.description}>
          <FaClipboardList className={styles.icon} />
          <p>{project.description}</p>
        </div>

        <h2 className={styles.sectionTitle}>Project Gallery</h2>
        <Masonry
          breakpointCols={{default: 3, 1100: 2, 700: 1}}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          {images.map((img, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveImage(img)}
            >
              <Image 
                src={img} 
                alt={`Project image ${index + 1}`} 
                width={400} 
                height={300} 
                layout="responsive"
              />
            </motion.div>
          ))}
        </Masonry>
      </div>

      {activeImage && (
        <div className={styles.lightbox} onClick={() => setActiveImage(null)}>
          <Image 
            src={activeImage} 
            alt="Enlarged project image" 
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
    </div>
    </>
  );
}