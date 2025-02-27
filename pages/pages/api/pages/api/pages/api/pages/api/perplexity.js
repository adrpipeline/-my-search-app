export default async function handler(req, res) {
  const { query } = req.query;
  
  const response = await fetch(`https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    },
  });

  const data = await response.json();
  res.status(200).json({ result: data.summary || "No result found" });
}
