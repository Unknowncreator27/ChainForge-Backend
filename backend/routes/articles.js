import express from 'express';
import { getArticles } from '../controllers/articlesController.js';

const router = express.Router();

router.get('/', getArticles); // /api/articles?category=Tech

export default router;
