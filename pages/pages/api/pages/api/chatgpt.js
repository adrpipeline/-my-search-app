export default async function handler(req, res) {
  const { query } = req.query;
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      prompt: query,
      max_tokens: 100,
    }),
  });
  const data = await response.json();
  res.status(200).json({ result: data.choices[0].text });
}
