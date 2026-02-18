import React, { useState } from "react";

function App() {
  const [originalText, setOriginalText] = useState("hello world");
  const [typedText, setTypedText] = useState("");
  const [result, setResult] = useState(null);

  // ⭐ NEW — AI summary state
  const [summary, setSummary] = useState("");

  // Upload PDF
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.text) {
      setOriginalText(data.text);
      setTypedText("");
    }

    // ⭐ SET AI SUMMARY
    if (data.summary) {
      setSummary(data.summary);
    }
  };

  const calculateMetrics = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/metrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        original_text: originalText,
        typed_text: typedText,
        time_seconds: 30,
      }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h2>TypeFlow Lite</h2>

      {/* Upload */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
      />

      {/* ⭐ AI SUMMARY PANEL */}
      {summary && (
        <div style={{ border: "1px solid #ccc", padding: 10, marginTop: 15 }}>
          <h4>AI Summary</h4>
          <p>{summary}</p>
        </div>
      )}

      {/* Main Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 250px",
          gap: 20,
          marginTop: 20,
        }}
      >
        {/* Original Text Panel */}
        <div style={{ border: "1px solid #ccc", padding: 10 }}>
          <h4>Original Text</h4>
          <textarea
            value={originalText}
            readOnly
            style={{ width: "100%", height: 200 }}
          />
        </div>

        {/* Typing Panel */}
        <div style={{ border: "1px solid #ccc", padding: 10 }}>
          <h4>Type Here</h4>
          <textarea
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            style={{ width: "100%", height: 200 }}
          />
          <br /><br />
          <button onClick={calculateMetrics}>Calculate</button>
        </div>

        {/* Metrics Panel */}
        <div style={{ border: "1px solid #ccc", padding: 10 }}>
          <h4>Metrics</h4>
          {result ? (
            <>
              <p><b>Accuracy:</b> {result.accuracy}</p>
              <p><b>WPM:</b> {result.wpm}</p>
            </>
          ) : (
            <p>No results yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
