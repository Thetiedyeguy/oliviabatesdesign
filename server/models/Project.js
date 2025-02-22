const pool = require('../db');

const Project = {
  // Get all projects with optional sorting
  getAll: async (sortBy = 'date', order = 'DESC') => {
    const validColumns = ['title', 'date', 'created_at'];
    const sortColumn = validColumns.includes(sortBy) ? sortBy : 'date';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const query = {
      text: `
        SELECT id, title, description, image_url AS "imageUrl", 
               project_url AS "projectUrl", date, tags
        FROM projects
        ORDER BY ${sortColumn} ${sortOrder}
      `,
    };

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (err) {
      throw new Error(`Failed to fetch projects: ${err.message}`);
    }
  },

  // Get single project by ID
  getById: async (id) => {
    const query = {
      text: `
        SELECT id, title, description, image_url AS "imageUrl", 
               project_url AS "projectUrl", date, tags
        FROM projects
        WHERE id = $1
      `,
      values: [id],
    };

    try {
      const { rows } = await pool.query(query);
      return rows[0] || null;
    } catch (err) {
      throw new Error(`Failed to fetch project ${id}: ${err.message}`);
    }
  },
};

module.exports = Project;