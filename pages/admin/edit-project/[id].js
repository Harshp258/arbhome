import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabaseClient';
import styles from '../../../styles/admin.module.css';
import { CldUploadWidget } from 'next-cloudinary';

export default function EditProject() {
  const [formData, setFormData] = useState({
    title: '',
    stagingType: '',
    address: '',
    description: '',
  });
  const [projectMedia, setProjectMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const checkSessionAndFetchProject = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setSession(session);
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
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title,
        stagingType: data.staging_type,
        address: data.address,
        description: data.description,
      });

      setProjectMedia(data.project_media || []);
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

  const handleUpload = (result) => {
    if (result.event === "success") {
      const info = result.info;
      setProjectMedia(prev => [...prev, info.secure_url]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: updateError } = await supabase
        .from('projects')
        .update({
          title: formData.title,
          staging_type: formData.stagingType,
          address: formData.address,
          description: formData.description,
          project_media: projectMedia,
        })
        .eq('id', id)
        .select();

      if (updateError) throw updateError;

      if (!data || data.length === 0) {
        throw new Error('No data returned from update operation. The project may not exist or you may not have permission to update it.');
      }

      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error updating project:', error);
      setError('Failed to update project: ' + error.message);
    } finally {
      setLoading(false);
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
          <label>Project Media (Images and Video)</label>
          <CldUploadWidget
            uploadPreset="project-images"
            options={{ 
              sources: ['local', 'url', 'camera'],
              multiple: true,
              maxFiles: 10,
              resourceType: "auto"
            }}
            onUpload={handleUpload}
          >
            {({ open }) => (
              <button onClick={() => open()} type="button" className={styles.uploadButton}>
                Upload Media
              </button>
            )}
          </CldUploadWidget>
          <div className={styles.mediaPreview}>
            {projectMedia.map((url, index) => (
              <div key={index} className={styles.mediaItem}>
                {url.includes('video') ? (
                  <video src={url} controls width="200" height="150" />
                ) : (
                  <img src={url} alt={`Project media ${index + 1}`} width="200" height="150" />
                )}
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Updating...' : 'Update Project'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
