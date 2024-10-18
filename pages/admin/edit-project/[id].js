import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabaseClient'; // Adjust the path as needed
import { v4 as uuidv4 } from 'uuid';
import styles from '../../../styles/admin.module.css';

export default function EditProject() {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const checkSessionAndFetchProject = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.log("No session found, redirecting to login");
        router.push('/admin/login');
      } else {
        console.log("Session found, fetching project");
        if (id) {
          fetchProject();
        }
      }
    };

    checkSessionAndFetchProject();
  }, [id, router]);

  const fetchProject = async () => {
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

      setFormData({
        title: data.title,
        stagingType: data.staging_type,
        address: data.address,
        description: data.description,
      });

      setImages(data.images.filter(img => !img.is_before && !img.is_after));
      setBeforeImage(data.images.find(img => img.is_before));
      setAfterImage(data.images.find(img => img.is_after));
      setVideo(data.videos[0]); // Assuming one video per project

      setLoading(false);
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Failed to load project: ' + error.message);
      setLoading(false);
    }
  };

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
      // Update project details
      const { data, error: updateError } = await supabase
        .from('projects')
        .update({
          title: formData.title,
          staging_type: formData.stagingType,
          address: formData.address,
          description: formData.description,
        })
        .eq('id', id)
        .select();

      if (updateError) throw updateError;

      if (!data || data.length === 0) {
        throw new Error('No data returned from update operation. The project may not exist or you may not have permission to update it.');
      }

      // Update images and video
      await updateImages(id, images);
      await updateBeforeAfterImages(id, beforeImage, afterImage);
      await updateVideo(id, video);

      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error updating project:', error);
      setError('Failed to update project: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  const updateImages = async (projectId, newImages) => {
    // Delete existing images that are not before/after images
    const { data: existingImages, error: fetchError } = await supabase
      .from('images')
      .select('*')
      .eq('project_id', projectId)
      .is('is_before', false)
      .is('is_after', false);

    if (fetchError) throw fetchError;

    for (let img of existingImages) {
      await supabase.storage.from('project-images').remove([img.image_url]);
      await supabase.from('images').delete().eq('id', img.id);
    }

    // Upload new images
    for (let img of newImages) {
      if (img instanceof File) {
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
      }
    }
  };

  const updateBeforeAfterImages = async (projectId, beforeImage, afterImage) => {
    const updateImage = async (image, isBefore) => {
      if (image instanceof File) {
        const fileName = `${projectId}/${uuidv4()}-${isBefore ? 'before' : 'after'}-${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        // Delete old before/after image if exists
        const { data: oldImage, error: fetchError } = await supabase
          .from('images')
          .select('*')
          .eq('project_id', projectId)
          .eq(isBefore ? 'is_before' : 'is_after', true)
          .single();

        if (oldImage) {
          await supabase.storage.from('project-images').remove([oldImage.image_url]);
          await supabase.from('images').delete().eq('id', oldImage.id);
        }

        // Insert new before/after image
        const { error: insertError } = await supabase.from('images').insert({
          project_id: projectId,
          image_url: fileName,
          is_before: isBefore,
          is_after: !isBefore
        });

        if (insertError) throw insertError;
      }
    };

    await updateImage(beforeImage, true);
    await updateImage(afterImage, false);
  };

  const updateVideo = async (projectId, newVideo) => {
    if (newVideo instanceof File) {
      // Delete existing video if any
      const { data: existingVideo, error: fetchError } = await supabase
        .from('videos')
        .select('*')
        .eq('project_id', projectId)
        .single();

      if (existingVideo) {
        await supabase.storage.from('project-videos').remove([existingVideo.video_url]);
        await supabase.from('videos').delete().eq('id', existingVideo.id);
      }

      // Upload new video
      const fileName = `${projectId}/${uuidv4()}-${newVideo.name}`;
      const { error: uploadError } = await supabase.storage
        .from('project-videos')
        .upload(fileName, newVideo);

      if (uploadError) throw uploadError;

      // Insert new video record
      const { error: insertError } = await supabase.from('videos').insert({
        project_id: projectId,
        video_url: fileName
      });

      if (insertError) throw insertError;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1>Edit Project</h1>
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
          <div className={styles.imagePreview}>
            {images.map((img, index) => (
              <img key={index} src={URL.createObjectURL(img)} alt={`Project image ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Before Image</label>
          <input
            type="file"
            onChange={(e) => handleImageChange(e, 'before')}
            accept="image/*"
            className={styles.fileInput}
          />
          {beforeImage && <img src={URL.createObjectURL(beforeImage)} alt="Before" className={styles.imagePreview} />}
        </div>
        <div className={styles.formGroup}>
          <label>After Image</label>
          <input
            type="file"
            onChange={(e) => handleImageChange(e, 'after')}
            accept="image/*"
            className={styles.fileInput}
          />
          {afterImage && <img src={URL.createObjectURL(afterImage)} alt="After" className={styles.imagePreview} />}
        </div>
        <div className={styles.formGroup}>
          <label>Video</label>
          <input
            type="file"
            onChange={handleVideoChange}
            accept="video/*"
            className={styles.fileInput}
          />
          {video && <p>{video.name}</p>}
        </div>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Updating...' : 'Update Project'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}