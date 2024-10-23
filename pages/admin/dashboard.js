import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/admin.module.css';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSessionAndFetchProjects = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setSession(session);
        fetchProjects();
      }
    };

    checkSessionAndFetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data);
    }
    setLoading(false);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        setLoading(true);
        
        // Fetch project media
        const { data: project, error: projectError } = await supabase
          .from('projects')
          .select('project_media')
          .eq('id', projectId)
          .single();

        if (projectError) throw projectError;

        // Delete project from Supabase
        const { error: deleteError } = await supabase
          .from('projects')
          .delete()
          .eq('id', projectId);

        if (deleteError) throw deleteError;

        // Delete media from Cloudinary
        if (project.project_media && project.project_media.length > 0) {
          const cloudinaryUrls = project.project_media;
          // You'll need to implement a server-side function to delete from Cloudinary
          // as it's not secure to do it directly from the client-side
          const response = await fetch('/api/delete-cloudinary-media', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ urls: cloudinaryUrls }),
          });

          if (!response.ok) {
            throw new Error('Failed to delete media from Cloudinary');
          }
        }

        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!session) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
    <br />
    <br />
    <br />
    <br />

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.adminContainer}
    >
      <div className={styles.adminHeader}>
        <h1>Admin Dashboard</h1>
        <Link href="/admin/create-project">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.createButton}
          >
            <FaPlus /> Create New Project
          </motion.button>
        </Link>
      </div>
      {loading ? (
        <div className={styles.loading}>Loading projects...</div>
      ) : (
        <div className={styles.dashboardGrid}>
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              className={styles.projectCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <p className={styles.projectDetails}>Type: {project.staging_type}</p>
              <p className={styles.projectDetails}>Address: {project.address}</p>
              <div className={styles.actionButtons}>
                <Link href={`/admin/edit-project/${project.id}`}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.editButton}
                  >
                    <FaEdit /> Edit
                  </motion.button>
                </Link>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(project.id)} 
                  className={styles.deleteButton}
                >
                  <FaTrash /> Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
    <br />
    <br />
    <br />
    <br />
    </>
  );
}