import 'dotenv/config';
import express from 'express';
import path from 'path';
import pg from 'pg';

const app = express();
const pool = new pg.Pool();

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));

// makes any files in public available 
app.use(express.static(path.join(import.meta.dirname, 'public'))); 

app.get('/', async (req, res) => {
  const customerResult = await pool.query('SELECT count(*) FROM customers');
  const customerTotal = customerResult.rows[0].count;

  res.render('index', { customerTotal });
});

// temporary route to test the database connection
app.get('/test-db', async (req, res) => {
  const result = await pool.query('SELECT count(*) FROM customers');
  res.json(result.rows[0]);
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));