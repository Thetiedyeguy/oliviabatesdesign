require("dotenv").config();
const express = require("express");
const path = require('path');
const cors = require("cors");
const morgan = require("morgan");
const { Pool } = require("pg");
const multer = require('multer');
const fs = require('fs').promises;

const app = express();

const STATIC_UPLOADS_DIR = '/var/www/uploads'; // Changed from CLIENT_PUBLIC
const STATIC_BASE_URL = process.env.BASE_URL

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
      SELECT id, title, subtitle, description, 
        square_image_filename AS "squareImageFilename",
        rectangular_image_filename AS "rectangularImageFilename",
        project_url AS "projectUrl", date, featured
      FROM projects
      ORDER BY date DESC;
    `);
    
    // Transform filenames to full URLs.
    rows.forEach(project => {
      if (project.squareImageFilename) {
        project.squareImageUrl = `${process.env.BASE_URL}/${project.squareImageFilename}`;
      }
      if (project.rectangularImageFilename) {
        project.rectangularImageUrl = `${process.env.BASE_URL}/${project.rectangularImageFilename}`;
      }
    });

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
      `SELECT id, title, subtitle, description, 
        square_image_filename AS "squareImageFilename",
        rectangular_image_filename AS "rectangularImageFilename",
        project_url AS "projectUrl", date, featured
      FROM projects 
      WHERE id = $1`,
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Project not found" });
    }
    
    // Transform filenames to full URLs.
    rows.forEach(project => {
      if (project.squareImageFilename) {
        project.squareImageUrl = `${process.env.BASE_URL}/${project.squareImageFilename}`;
      }
      if (project.rectangularImageFilename) {
        project.rectangularImageUrl = `${process.env.BASE_URL}/${project.rectangularImageFilename}`;
      }
    });
    
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
    rows.forEach(project => {
      if (project.squareImageFilename) {
        project.squareImageUrl = `${process.env.BASE_URL}/uploads/${project.squareImageFilename}`;
      }
      if (project.rectangularImageFilename) {
        project.rectangularImageUrl = `${process.env.BASE_URL}/uploads/${project.rectangularImageFilename}`;
      }
    });
    
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
  destination: async (req, file, cb) => {
    try {
      // Ensure directory exists
      await fs.mkdir(STATIC_UPLOADS_DIR, { recursive: true });
      cb(null, STATIC_UPLOADS_DIR);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (req, file, cb) => {
    console.log('Received file:', file.originalname, 'size:', file.size);
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});


// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '/var/www/uploads')));

// Update the projects POST route
app.post("/api/projects", async (req, res) => {
  const { title, subtitle, description, projectPath, date, featured, squareImage, rectangularImage } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      status: "error",
      message: "Title and description are required"
    });
  }

  try {
    // Since you're manually uploading images to your public folder,
    // the database now only stores the image filenames.
    // Calculate projectUrl if necessary.
    const projectUrl = `${process.env.BASE_URL}${projectPath}`;

    const { rows } = await pool.query(
      `INSERT INTO projects 
      (title, subtitle, description, square_image_filename, rectangular_image_filename, project_url, date, featured)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, title, subtitle, date, featured`,
      [
        title,
        subtitle,
        description,
        squareImage || null,
        rectangularImage || null,
        projectUrl,
        date || new Date().toISOString(),
        featured === true || featured === 'true'
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
});




app.patch("/api/projects/:id", async (req, res) => {
  const {
    title, subtitle, description,
    projectPath, date, featured,
    squareImage, rectangularImage
  } = req.body;

  // basic validation
  if (!title || !description) {
    return res.status(400).json({
      status: "error",
      message: "Title and description are required"
    });
  }

  try {
    const projectUrl = `${process.env.BASE_URL}${projectPath}`;
    const { rows, rowCount } = await pool.query(
      `UPDATE projects
         SET title = $1,
             subtitle = $2,
             description = $3,
             square_image_filename = $4,
             rectangular_image_filename = $5,
             project_url = $6,
             date = $7,
             featured = $8
       WHERE id = $9
       RETURNING id, title, subtitle, description, project_url AS "projectUrl",
                 date, featured,
                 square_image_filename AS "squareImageFilename",
                 rectangular_image_filename AS "rectangularImageFilename"`,
      [
        title,
        subtitle,
        description,
        squareImage || null,
        rectangularImage || null,
        projectUrl,
        date || new Date().toISOString(),
        featured === true || featured === 'true',
        req.params.id
      ]
    );

    if (rowCount === 0) {
      return res.status(404).json({ status: "error", message: "Project not found" });
    }
    res.status(200).json({ status: "success", data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to update project" });
  }
});




// Add delete project route
app.delete("/api/projects/:id", 
  async (req, res) => {
    try {
      

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
  }
);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});