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
    squareImage: '',            // Now a string
    rectangularImage: '',       // Now a string
    featured: false
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);

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
  
    const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      projectPath: formData.projectPath,
      date: formData.date,
      featured: formData.featured,
      squareImage: formData.squareImage,
      rectangularImage: formData.rectangularImage,
    };
  
    try {
      if (editingId) {
        // EDIT existing project
        const res = await ProjectFinder.patch(`/${editingId}`, payload);
        // update local list
        setProjects(prev =>
          prev.map(p => p.id === editingId ? { ...p, ...res.data.data } : p)
        );
        setEditingId(null);
      } else {
        // CREATE new project
        const res = await ProjectFinder.post('', payload);
        setProjects(prev => [res.data.data, ...prev]);
      }
      setSuccess(true);
      // reset form
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        projectPath: '',
        date: '',
        squareImage: '',
        rectangularImage: '',
        featured: false
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
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
      <h1 className={styles.title}>
        {editingId ? 'Edit Project' : 'Add New Project'}
      </h1>
      
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
          <label>Square Image Filename</label>
          <input
            type="text"
            name="squareImage"
            value={formData.squareImage}
            onChange={handleChange}
            placeholder="e.g., my-image.jpg"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Rectangular Image Filename</label>
          <input
            type="text"
            name="rectangularImage"
            value={formData.rectangularImage}
            onChange={handleChange}
            placeholder="e.g., hero-image.jpg"
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
          {loading
            ? editingId ? 'Saving…' : 'Adding…'
            : editingId ? 'Save Changes' : 'Add Project'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({
                title: '',
                subtitle: '',
                description: '',
                projectPath: '',
                date: '',
                squareImage: '',
                rectangularImage: '',
                featured: false
              });
            }}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        )}
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
              className={styles.editButton}
              onClick={() => {
                // enter edit mode
                setEditingId(project.id);
                setFormData({
                title: project.title,
                subtitle: project.subtitle || '',
                description: project.description || '',
                projectPath: project.projectUrl.replace(
                  /^https?:\/\/[^/]+/,  // strip off protocol and host
                  ''
                ),
                date: project.date?.slice(0,10) || '',
                squareImage: project.squareImageFilename || '',
                rectangularImage: project.rectangularImageFilename || '',
                featured: project.featured
              });
            }}
            >
              Edit
            </button>
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