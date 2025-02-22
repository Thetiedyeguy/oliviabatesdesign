const { Pool } = require('pg');
require('dotenv').config(); // For environment variables

const isProduction = process.env.NODE_ENV === 'production';

// Development configuration
const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

// Production configuration (using connection string)
const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
};

const pool = new Pool(isProduction ? prodConfig : devConfig);

// Connection test
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Database connected at:', new Date().toLocaleString());
  }
});

module.exports = pool;