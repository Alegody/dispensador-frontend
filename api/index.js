import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection config from docker-compose
const pool = new Pool({
  host: process.env.DATABASE_HOST || 'coordinator',
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'mysecretpassword',
  database: process.env.DATABASE_NAME || 'mydatabase',
});

app.get('/', async (req, res) => {
  try {
    // Simple query to check connection
    await pool.query('SELECT 1');
    res.send('OK');
  } catch (err) {
    res.status(500).send('Database connection error');
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
