import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/admin.module.css';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkSessionAndFetchProjects = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.log("No session found, redirecting to login");
        router.push('/admin/login');
      } else {
        console.log("Session found, fetching projects");
        setSession(session);
        fetchProjects();
      }
    };

    checkSessionAndFetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*');
    
    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      // Delete associated images
      const { data: images, error: imagesError } = await supabase
        .from('images')
        .select('image_url')
        .eq('project_id', projectId);

      if (imagesError) throw imagesError;

      for (let image of images) {
        await supabase.storage.from('project-images').remove([image.image_url]);
      }

      // Delete associated video
      const { data: video, error: videoError } = await supabase
        .from('videos')
        .select('video_url')
        .eq('project_id', projectId)
        .single();

      if (videoError && videoError.code !== 'PGRST116') throw videoError;

      if (video) {
        await supabase.storage.from('project-videos').remove([video.video_url]);
      }

      // Delete project and related records
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (deleteError) throw deleteError;

      // Refresh projects list
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1>Admin Dashboard</h1>
      </div>
      <Link href="/admin/create-project">
        <button className={styles.submitButton}>Create New Project</button>
      </Link>
      <div className={styles.dashboardGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <h2 className={styles.projectTitle}>{project.title}</h2>
            <p className={styles.projectDetails}>Type: {project.staging_type}</p>
            <p className={styles.projectDetails}>Address: {project.address}</p>
            <div className={styles.actionButtons}>
              <Link href={`/admin/edit-project/${project.id}`}>
                <button className={styles.editButton}>Edit</button>
              </Link>
              <button onClick={() => handleDelete(project.id)} className={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}