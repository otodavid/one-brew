import { Pool } from 'pg';
import 'dotenv/config';

const conn = new Pool({ connectionString: process.env.DATABASE_URL });

// test DB connection
conn.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection to database failed');
  } else {
    console.log('Connected to database successfully');
  }
});

export default conn;
