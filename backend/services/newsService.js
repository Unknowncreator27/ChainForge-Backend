import fetch from 'node-fetch';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function fetchNews(category) {
  // Example: fetch raw articles from your source
  const res = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + process.env.NEWS_~API_KEY);
  const data = await res.json();

  const articles = data.articles.map(article => ({
    title: article.title,
    summary: article.description,
    source: article.source.name,
    publishedAgo: article.publishedAt,
    imgUrl: article.urlToImage,
    url: article.url,
  }));

  // Generate AI summaries in parallel
  const articlesWithSummaries = await Promise.all(
    articles.map(async article => {
      try {
        const prompt = `
        Summarize this article in 2-3 concise sentences:

        ${article.summary || article.title}
        `;

        const aiResponse = await openai.chat.completions.create({
          model: "gpt-4.1-mini",
          messages: [
            { role: "system", content: "You are a helpful news summarizer." },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
        });

        article.aiSummary = aiResponse.choices[0].message.content.trim();
      } catch (err) {
        console.error("AI summary error:", err.message);
        article.aiSummary = article.summary || "";
      }

      return article;
    })
  );

  return articlesWithSummaries;
}
