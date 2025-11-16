import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import articlesRouter from './routes/articles.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors());
app.use(express.json());

app.use('/api/articles', articlesRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Service Running on host ${HOST}`)
});
