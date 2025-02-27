import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [perplexityResult, setPerplexityResult] = useState("");
  const [chatGPTResult, setChatGPTResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true);

    // Fetch Perplexity AI Results
    const perplexityResponse = await fetch(`/api/perplexity?query=${query}`);
    const perplexityData = await perplexityResponse.json();
    setPerplexityResult(perplexityData.result);

    // Fetch ChatGPT Results
    const chatGPTResponse = await fetch(`/api/chatgpt?query=${query}`);
    const chatGPTData = await chatGPTResponse.json();
    setChatGPTResult(chatGPTData.result);

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Search App</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your search query..."
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={fetchResults} disabled={loading} style={{ padding: "10px", cursor: "pointer" }}>
        {loading ? "Loading..." : "Search"}
      </button>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div style={{ width: "48%", border: "1px solid black", padding: "10px" }}>
          <h2>Perplexity AI</h2>
          <p>{perplexityResult || "No result yet"}</p>
        </div>
        <div style={{ width: "48%", border: "1px solid black", padding: "10px" }}>
          <h2>ChatGPT</h2>
          <p>{chatGPTResult || "No result yet"}</p>
        </div>
      </div>
    </div>
  );
}
