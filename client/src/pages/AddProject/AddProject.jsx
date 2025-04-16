import React, { useState, useEffect } from 'react';
import styles from './AddProject.module.css';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import ProjectFinder from '../../apis/ProjectFinder';

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    projectPath: '',
    date: '',
    squareImage: null,
    rectangularImage: null,
    featured: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await ProjectFinder.get('/');
        setProjects(response.data.data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };
    fetchProjects();
  }, []);

  
  const handleDeleteProject = async () => {
    try {
      await ProjectFinder.delete(`/${projectToDelete.id}`, {
        headers: {
          'X-Admin-Key': 'your_secret_key_here'
        }
      });
      
      setProjects(prev => 
        prev.filter(project => project.id !== projectToDelete.id)
      );
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Failed to delete project');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
  
    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('subtitle', formData.subtitle);
    formPayload.append('description', formData.description);
    formPayload.append('projectPath', formData.projectPath);
    formPayload.append('date', formData.date);
    formPayload.append('featured', formData.featured);
    
    // Append files if provided
    if (formData.squareImage) {
      formPayload.append('squareImage', formData.squareImage);
    }
    if (formData.rectangularImage) {
      formPayload.append('rectangularImage', formData.rectangularImage);
    }
  
    try {
      await ProjectFinder.post('/api/projects', formPayload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
      });
      setSuccess(true);
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        projectPath: '',
        date: '',
        squareImage: null,
        rectangularImage: null,
        featured: false
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add project');
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const updateFeaturedStatus = async (projectId, newStatus) => {
    try {
      await ProjectFinder.patch(`/${projectId}`, { featured: newStatus });
      // Update local state after success
    } catch (err) {
      console.error("Failed to update featured status:", err);
    }
  };
  
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Project</h1>
      
      {success && (
        <div className={styles.success}>Project added successfully!</div>
      )}
      
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Square Image</label>
          <input
            type="file"
            name="squareImage"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Rectangular Image</label>
          <input
            type="file"
            name="rectangularImage"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Project Path (e.g., /projects/1)</label>
          <input
            type="text"
            name="projectPath"
            value={formData.projectPath}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Date (YYYY-MM-DD)</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
            />
            Featured Project
          </label>
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Project'}
        </button>
      </form>

      <div className={styles.projectsList}>
        <h2>Existing Projects</h2>
        {projects.map(project => (
          <div key={project.id} className={styles.projectItem}>
            <div>
              <span>#{project.id} - {project.title}</span>
              { project.subtitle && <em> — {project.subtitle}</em> }
            </div>
            <div className={styles.actionButtons}>
              <button
                onClick={() => {
                  // Toggle featured: if currently featured, unfeature; if not, feature.
                  updateFeaturedStatus(project.id, !project.featured);
                }}
                className={styles.featuredButton}
              >
                {project.featured ? "Unfeature" : "Feature"}
              </button>
              <button
                onClick={() => {
                  setProjectToDelete(project);
                  setShowDeleteModal(true);
                }}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>


      {showDeleteModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete "${projectToDelete.title}"?`}
          onConfirm={handleDeleteProject}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default AddProject;