require("dotenv").config();
const express = require("express");
const path = require('path');
const cors = require("cors");
const morgan = require("morgan");
const { Pool } = require("pg");
const multer = require('multer');
const fs = require('fs').promises;

const app = express();

const CLIENT_PUBLIC = path.join(__dirname, '../client/public/uploads');

// Database configuration
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan("dev"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// Get all projects
app.get("/api/projects", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, title, description, 
             image_url AS "imageUrl", 
             project_url AS "projectUrl", 
             date, tags
      FROM projects
      ORDER BY date DESC
    `);
    res.status(200).json({ status: "success", data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to fetch projects" });
  }
});

// Get single project
app.get("/api/projects/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, title, description, 
              image_url AS "imageUrl", 
              project_url AS "projectUrl", 
              date, tags
       FROM projects 
       WHERE id = $1`,
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Project not found" });
    }
    
    res.status(200).json({ status: "success", data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to fetch project" });
  }
});

// Get all skills
app.get("/api/skills", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, name, proficiency, category, icon_name AS "iconName"
      FROM skills
      ORDER BY proficiency DESC
    `);
    res.status(200).json({ status: "success", data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to fetch skills" });
  }
});

// Submit contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ 
      status: "error", 
      message: "All fields are required" 
    });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO messages (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING id, created_at`,
      [name, email, message]
    );
    
    res.status(201).json({ 
      status: "success", 
      data: { 
        message: "Contact form submitted successfully",
        timestamp: rows[0].created_at 
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      status: "error", 
      message: "Failed to submit contact form" 
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

// Add new project (admin only)
// Configure file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, CLIENT_PUBLIC);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Update the projects POST route
app.post("/api/projects", 
  upload.single('image'),
  async (req, res) => {
    const { title, description, projectPath, date, tags } = req.body;
    
    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        status: "error",
        message: "Title and description are required"
      });
    }

    try {
      const imageUrl = req.file 
        ? `/uploads/${req.file.filename}`
        : null;

      const projectUrl = `${process.env.BASE_URL}${projectPath}`;

      const { rows } = await pool.query(
        `INSERT INTO projects 
         (title, description, image_url, project_url, date, tags)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, title, date`,
        [
          title,
          description,
          imageUrl,
          projectUrl,
          date || new Date().toISOString(),
          tags ? tags.split(',') : []
        ]
      );

      res.status(201).json({
        status: "success",
        data: rows[0]
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: "Failed to create project"
      });
    }
  }
);

// Add delete project route
app.delete("/api/projects/:id", 
  async (req, res) => {
    try {
      // First get the project to find image path
      const project = await pool.query(
        'SELECT image_url FROM projects WHERE id = $1',
        [req.params.id]
      );

      // Delete the project
      const { rowCount } = await pool.query(
        'DELETE FROM projects WHERE id = $1',
        [req.params.id]
      );

      if (rowCount === 0) {
        return res.status(404).json({
          status: "error",
          message: "Project not found"
        });
      }

      // Delete associated image file
      if (project.rows[0]?.image_url) {
        const imagePath = path.join(
          __dirname, 
          'public', 
          project.rows[0].image_url
        );
        fs.unlink(imagePath, (err) => {
          if (err) console.error('Error deleting image:', err);
        });
      }

      res.status(200).json({
        status: "success",
        message: "Project deleted successfully"
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: "Failed to delete project"
      });
    }
    if (project.rows[0]?.image_url) {
      const imagePath = path.join(
        __dirname, 
        'public', 
        project.rows[0].image_url
      );
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error('Error deleting image:', err);
      }
    }
  }
);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});