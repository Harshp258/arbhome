import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../styles/admin.module.css';

export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: '',
    stagingType: '',
    address: '',
    description: '',
  });
  const [images, setImages] = useState([]);
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setSession(session);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === 'images') {
      setImages(prev => [...prev, ...files]);
    } else if (type === 'before') {
      setBeforeImage(files[0]);
    } else if (type === 'after') {
      setAfterImage(files[0]);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          title: formData.title,
          staging_type: formData.stagingType,
          address: formData.address,
          description: formData.description,
        })
        .select()
        .single();

      if (projectError) throw projectError;
      if (!project) throw new Error('Failed to create project: No data returned');

      // Upload images and video
      await uploadImages(project.id, images);
      await uploadBeforeAfterImages(project.id, beforeImage, afterImage);
      await uploadVideo(project.id, video);

      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error creating project:', error);
      setError(`Failed to create project: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (projectId, images) => {
    for (let img of images) {
      try {
        const fileName = `${projectId}/${uuidv4()}-${img.name}`;
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, img);

        if (uploadError) throw uploadError;

        const { error: insertError } = await supabase.from('images').insert({
          project_id: projectId,
          image_url: fileName,
          is_before: false,
          is_after: false
        });

        if (insertError) throw insertError;
      } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
        throw error;
      }
    }
  };

  const uploadBeforeAfterImages = async (projectId, beforeImage, afterImage) => {
    const uploadImage = async (image, isBefore) => {
      if (image) {
        try {
          const fileName = `${projectId}/${uuidv4()}-${isBefore ? 'before' : 'after'}-${image.name}`;
          const { error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(fileName, image);

          if (uploadError) throw uploadError;

          const { error: insertError } = await supabase.from('images').insert({
            project_id: projectId,
            image_url: fileName,
            is_before: isBefore,
            is_after: !isBefore
          });

          if (insertError) throw insertError;
        } catch (error) {
          console.error(`Error uploading ${isBefore ? 'before' : 'after'} image: ${error.message}`);
          throw error;
        }
      }
    };

    await uploadImage(beforeImage, true);
    await uploadImage(afterImage, false);
  };

  const uploadVideo = async (projectId, video) => {
    if (video) {
      try {
        const fileName = `${projectId}/${uuidv4()}-${video.name}`;
        const { error: uploadError } = await supabase.storage
          .from('project-videos')
          .upload(fileName, video);

        if (uploadError) throw uploadError;

        const { error: insertError } = await supabase.from('videos').insert({
          project_id: projectId,
          video_url: fileName
        });

        if (insertError) throw insertError;
      } catch (error) {
        console.error(`Error uploading video: ${error.message}`);
        throw error;
      }
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1>Create New Project</h1>
      </div>
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
            className={styles.formSelect}
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
          <label htmlFor="address">Property Address</label>
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
          <label htmlFor="description">Project Description</label>
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
          <label>Project Images</label>
          <input
            type="file"
            onChange={(e) => handleImageChange(e, 'images')}
            multiple
            accept="image/*"
            className={styles.fileInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Before Image</label>
          <input
            type="file"
            onChange={(e) => handleImageChange(e, 'before')}
            accept="image/*"
            className={styles.fileInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label>After Image</label>
          <input
            type="file"
            onChange={(e) => handleImageChange(e, 'after')}
            accept="image/*"
            className={styles.fileInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Video</label>
          <input
            type="file"
            onChange={handleVideoChange}
            accept="video/*"
            className={styles.fileInput}
          />
        </div>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}