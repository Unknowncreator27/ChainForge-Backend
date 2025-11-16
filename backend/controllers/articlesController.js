import { fetchNews } from '../services/newsService.js';

export const getArticles = async (req, res) => {
  const category = req.query.category || null;

  try {
    const articles = await fetchNews(category);
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};
