import React, { useState, useEffect } from 'react';
import styles from './AddProject.module.css';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import ProjectFinder from '../../apis/ProjectFinder';
import BubbleSection from '../../components/Bubbles/BubbleSection';

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    squareImage: '',
    link: '',
    featured: false,
    radius: 60,
    bg_opacity: 0.5,
    x_position: 0.5,
    y_position: 0.5
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [bubbleData, setBubbleData] = useState([]);


  const getImagePath = async (title) => {
  const base = `/images/${title.replace(/\s+/g, '-')}`;
  const extensions = ['jpg', 'jpeg', 'png'];

  for (const ext of extensions) {
    const url = `${base}.${ext}`;

    try {
      const res = await fetch(url, { method: 'GET' });

      const contentType = res.headers.get('content-type') || '';

      if (res.ok && contentType.startsWith('image/')) {
        return url;
      }
    } catch (e) {
      // ignore
    }
  }


  return null;
};

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await ProjectFinder.get('/');
        console.log(response.data.data);
        const bubbles = await Promise.all(
          response.data.data.map(async (project) => {
            const image = await getImagePath(project.title);

            return {
              id: Number(project.id),
              type: 'project',
              title: project.title,
              subtitle: project.subtitle,
              link: `/${project.title}`,
              image, // ← resolved image path
              opacity: Number(project.bg_opacity),
              radius: Number(project.radius) || 20,
              x: Number(project.x_position) || 0.7,
              y: Number(project.y_position) || 0.7,
              featured: project.featured
            };
          })
        );
        setBubbleData(bubbles);
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
        headers: { 'X-Admin-Key': 'your_secret_key_here' }
      });
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
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

    const payload = { ...formData };

    try {
      if (editingId) {
        const res = await ProjectFinder.patch(`/${editingId}`, payload);
        setProjects(prev =>
          prev.map(p => p.id === editingId ? { ...p, ...res.data.data } : p)
        );
        setEditingId(null);
      } else {
        const res = await ProjectFinder.post('', payload);
        setProjects(prev => [res.data.data, ...prev]);
      }
      setSuccess(true);
      setFormData({ title: '', subtitle: '', squareImage: '', rectangularImage: '', link: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectBubble = (bubble) => {
  setEditingId(bubble.id);

  setFormData({
    title: bubble.title || '',
    subtitle: bubble.subtitle || '',
    squareImage: bubble.image || '',
    link: bubble.link || '',
    featured: bubble.featured || false,
    radius: bubble.radius,
    bg_opacity: bubble.opacity,
    x_position: bubble.x,
    y_position: bubble.y
  });
};

useEffect(() => {
  if (!editingId) return;

  const timeout = setTimeout(async () => {
    try {
      await ProjectFinder.patch(`/${editingId}`, {
        title: formData.title,                 // ✅ REQUIRED
        subtitle: formData.subtitle,
        link: formData.link,
        featured: formData.featured,

        x_position: formData.x_position,
        y_position: formData.y_position,
        radius: Math.round(formData.radius),
        bg_opacity: formData.bg_opacity
      });
    } catch (err) {
      console.error('Auto-save failed', err.response?.data || err);
    }
  }, 150);

  return () => clearTimeout(timeout);
}, [
  editingId,
  formData.title,
  formData.subtitle,
  formData.link,
  formData.featured,
  formData.x_position,
  formData.y_position,
  formData.radius,
  formData.bg_opacity
]);




  console.log(bubbleData);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {editingId ? 'Edit Project' : 'Add New Project'}
      </h1>

      {success && <div className={styles.success}>Project saved successfully!</div>}
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
          <label>Image URL</label>
          <input
            type="text"
            name="squareImage"
            value={formData.squareImage}
            onChange={handleChange}
            placeholder="e.g., http://example.com/image-square.jpg"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Project Link</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="e.g., /projects/alginate"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Bubble Radius (px)</label>
          <input
            type="number"
            name="radius"
            value={formData.radius}
            onChange={handleChange}
            min="10"
            max="400"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Background Opacity (0-1)</label>
          <input
            type="number"
            name="bg_opacity"
            value={formData.bg_opacity}
            onChange={handleChange}
            step="0.001"
            min="0"
            max="1"
          />
        </div>

        <div className={styles.formGroup}>
          <label>X Position (%)</label>
          <input
            type="number"
            name="x_position"
            value={formData.x_position}
            onChange={handleChange}
            step="0.001"
            min="0"
            max="1"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Y Position (%)</label>
          <input
            type="number"
            name="y_position"
            value={formData.y_position}
            onChange={handleChange}
            step="0.001"
            min="0"
            max="1"
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



        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Saving…' : editingId ? 'Save Changes' : 'Add Project'}
        </button>

        {editingId && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => {
              setEditingId(null);
              setFormData({ title: '', subtitle: '', squareImage: '', rectangularImage: '', link: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <div className={styles.bubbleContainer}>
        <BubbleSection
          bubbleData={bubbleData}
          editable
          onSelectBubble={handleSelectBubble}
          onPositionChange={(x, y, radius) => {
            setFormData(prev => ({
              ...prev,
              x_position: Number(x.toFixed(3)),
              y_position: Number(y.toFixed(3)),
              radius: Math.round(radius)
            }));
          }}
        />
      </div>

      <div className={styles.projectsList}>
        <h2>Existing Projects</h2>
        {projects.map(project => (
          <div key={project.id} className={styles.projectItem}>
            <div>
              <span>#{project.id} - {project.title}</span>
              {project.subtitle && <em> — {project.subtitle}</em>}
            </div>
            <div className={styles.actionButtons}>
              <button
                className={styles.editButton}
                onClick={() => {
                  setEditingId(project.id);
                  setFormData({
                    title: project.title,
                    subtitle: project.subtitle || '',
                    squareImage: project.squareImageFilename || '',
                    link: project.link || '',
                    featured: project.featured || false,  // Add this line
                    radius: project.radius || 60,
                    bg_opacity: project.bg_opacity || 0.5,
                    x_position: project.x_position || 0.5,
                    y_position: project.y_position || 0.5
                  });
                }}
              >
                Edit
              </button>
              <button
                onClick={() => { setProjectToDelete(project); setShowDeleteModal(true); }}
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
