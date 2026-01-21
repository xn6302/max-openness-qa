import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    setLoading(true);
    setAnswer("");

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  }

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Max-Openness Q&A</h1>

      <textarea
        rows={4}
        style={{ width: "100%", marginTop: 10 }}
        placeholder="Ask any question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={ask} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? "Thinking…" : "Ask"}
      </button>

      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {answer}
      </pre>
    </main>
  );
}
