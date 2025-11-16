import express from 'express';
import { getArticles } from '../controllers/articlesController.js';

const router = express.Router();

// GET /api/articles?category=Tech
router.get('/', getArticles);

export default router;
