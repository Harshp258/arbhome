import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/ProjectDetail.module.css';

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          images(*),
          videos(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      setProject(data);
      setImages(data.images.filter(img => !img.is_before && !img.is_after));
      setBeforeImage(data.images.find(img => img.is_before));
      setAfterImage(data.images.find(img => img.is_after));
      setVideo(data.videos[0]); // Assuming one video per project

      setLoading(false);
    } catch (error) {
      console.error('Error fetching project details:', error);
      setError('Failed to load project details');
      setLoading(false);
    }
  };

  const getImageUrl = (path) => {
    return supabase.storage.from('project-images').getPublicUrl(path).data.publicUrl;
  };

  const getVideoUrl = (path) => {
    return supabase.storage.from('project-videos').getPublicUrl(path).data.publicUrl;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className={styles.projectDetail}>
      <h1>{project.title}</h1>
      <p>Staging Type: {project.staging_type}</p>
      <p>Address: {project.address}</p>
      <p>Description: {project.description}</p>

      <h2>Project Images</h2>
      <div className={styles.imageGrid}>
        {images.map((img, index) => (
          <img key={index} src={getImageUrl(img.image_url)} alt={`Project image ${index + 1}`} />
        ))}
      </div>

      <h2>Before and After</h2>
      <div className={styles.beforeAfter}>
        {beforeImage && (
          <div>
            <h3>Before</h3>
            <img src={getImageUrl(beforeImage.image_url)} alt="Before" />
          </div>
        )}
        {afterImage && (
          <div>
            <h3>After</h3>
            <img src={getImageUrl(afterImage.image_url)} alt="After" />
          </div>
        )}
      </div>

      {video && (
        <div className={styles.videoSection}>
          <h2>Project Video</h2>
          <video controls>
            <source src={getVideoUrl(video.video_url)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}