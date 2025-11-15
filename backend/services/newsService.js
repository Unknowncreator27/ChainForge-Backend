import axios from 'axios';

const MOCK_ARTICLES = [
  { title: "Apple hits new peak", summary: "Apple stock reaches a new high...", source: "Bloomberg", publishedAgo: "2h ago", imgUrl: null, url: null, category: "Tech" },
  { title: "Oil prices rise", summary: "Global oil prices see an increase...", source: "Reuters", publishedAgo: "4h ago", imgUrl: null, url: null, category: "Markets" },
  { title: "Tech mergers 2025", summary: "Major tech mergers announced...", source: "TechCrunch", publishedAgo: "6h ago", imgUrl: null, url: null, category: "Tech" },
];

export const fetchNews = async (category = 'All') => {
  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY) {
    console.warn("NEWS_API_KEY not set. Returning mock data.");
    return category === 'All' ? MOCK_ARTICLES : MOCK_ARTICLES.filter(a => a.category === category);
  }

  try {
    const url = `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${API_KEY}`;
    const response = await axios.get(url);

    let articles = response.data.articles.map(a => ({
      title: a.title,
      summary: a.description,
      source: a.source.name,
      publishedAgo: a.publishedAt,
      imgUrl: a.urlToImage,
      url: a.url,
      category: 'Business', // Can map based on your API
    }));

    if (category !== 'All') {
      articles = articles.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }

    return articles;
  } catch (err) {
    console.error("Error fetching from news API. Returning mock data.", err);
    return category === 'All' ? MOCK_ARTICLES : MOCK_ARTICLES.filter(a => a.category === category);
  }
};
