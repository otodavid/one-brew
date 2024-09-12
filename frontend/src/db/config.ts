import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// test DB connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database successfully');
    console.log('Current timestamp:', res.rows[0].now);
  }
});

export default pool;
