import { fetchNews } from '../services/newsService.js';

export const getArticles = async (req, res) => {
  try {
    const category = req.query.category || 'All';
    const articles = await fetchNews(category);
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch articles' });
    
  }
};
