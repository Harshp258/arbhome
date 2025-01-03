// admin/create-project.js

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/admin.module.css';
import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/legacy/image";

export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: '',
    stagingType: '',
    address: '',
    description: '',
  });
  
  const [projectMedia, setProjectMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const router = useRouter();
  
  const navigateToLogin = useCallback(() => {
    router.push('/admin/login');
  }, [router]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigateToLogin();
      } else {
        setSession(session);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [navigateToLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUploadSuccess = (result) => {
    if (result.event === "success") {
      const info = result.info;
      console.log(`Uploaded:`, info);
      setProjectMedia(prev => [...prev, info]); // Store both image and video info
    }
  };

  const handleRemoveMedia = (indexToRemove) => {
    setProjectMedia(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check that we've got media to submit
    if (projectMedia.length === 0) {
      setError("Please upload at least one media item.");
      setLoading(false);
      return;
    }

    try {
      // Submit the project data to Supabase
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          title: formData.title,
          staging_type: formData.stagingType,
          address: formData.address,
          description: formData.description,
          project_media: projectMedia.map(media => media.secure_url), // Ensure that video URLs are included
        })
        .select()
        .single();

      if (projectError) throw projectError;

      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error creating project:', error);
      setError(`Failed to create project: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <br />
    <br />
    <br />
    <br /> 
    
    <div className={styles.adminContainer}>
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit} className={styles.adminForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Project Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.formInput}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="stagingType">Staging Type</label>
          <select
            id="stagingType"
            name="stagingType"
            value={formData.stagingType}
            onChange={handleChange}
            className={styles.formInput}
            required
          >
            <option value="">Select Staging Type</option>
            <option value="Real Estate Staging">Real Estate Staging</option>
            <option value="Staging Consultation">Staging Consultation</option>
            <option value="Luxury Home Staging">Luxury Home Staging</option>
            <option value="Occupied Home Staging">Occupied Home Staging</option>
            <option value="Vacant Home Staging">Vacant Home Staging</option>
            <option value="Condo Staging">Condo Staging</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.formTextarea}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="media">Project Media (Images and Video)</label>
          <CldUploadWidget
            uploadPreset="project-images"
            options={{ 
              sources: ['local', 'url', 'camera'],
              multiple: true,
              maxFiles: 50,
              resourceType: "auto"// Use 'auto' to support both images and videos
            }}
            onSuccess={handleUploadSuccess} // Use the onSuccess callback
          >
            {({ open }) => (
              <button onClick={() => open()} type="button" className={styles.uploadButton}>
                Upload Media
              </button>
            )}
          </CldUploadWidget>
          
          <div className={styles.mediaPreview}>
            {projectMedia.map((media, index) => (
              <div key={index} className={styles.mediaItem}>
                {media.resource_type === 'video' ? (
                  <video src={media.secure_url} controls width="200" height="150" />
                ) : (
                  <Image src={media.secure_url} alt={`Project media ${index + 1}`} width={200} height={150} />
                )}
                <button 
                  type="button" 
                  onClick={() => handleRemoveMedia(index)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
 
  <br />
  <br />
  <br />
  </>
   );
}
