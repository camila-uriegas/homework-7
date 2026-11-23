import express from 'express';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));

// makes any files in public available 
app.use(express.static(path.join(import.meta.dirname, 'public'))); 

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));