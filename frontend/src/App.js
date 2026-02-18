import React, { useState } from "react";
import "./App.css";

function App() {
  const [originalText, setOriginalText] = useState("hello world");
  const [typedText, setTypedText] = useState("");
  const [result, setResult] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // Upload PDF
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      "https://typeflow-lite.onrender.com/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.text) {
      setOriginalText(data.text);
      setTypedText("");
    }

    if (data.summary) {
      setSummary(data.summary);
    }
  };

  const calculateMetrics = async () => {
    setLoading(true);

    const response = await fetch(
      "https://typeflow-lite.onrender.com/api/metrics",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          original_text: originalText,
          typed_text: typedText,
          time_seconds: 30,
        }),
      }
    );

    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="app-bg">
      {/* NAVBAR */}
      <div className="navbar">
        <h1>
          <span className="logo-main">TypeFlow</span>{" "}
          <span className="logo-lite">Lite</span>
        </h1>
        <div className="nav-links">⚙ Settings</div>
      </div>

      <div className="container">
        {/* Upload Zone */}
        <label className="upload-zone">
          📄 Drag & Drop or Click to Upload PDF
          <input type="file" accept="application/pdf" onChange={handleUpload} />
        </label>

        {/* AI Summary */}
        {summary && (
          <div className="card">
            <h3>✨ AI Summary</h3>
            <p>{summary}</p>
          </div>
        )}

        {/* MAIN GRID */}
        <div className="grid">
          {/* Original */}
          <div className="card">
            <h3>Original Text</h3>
            <textarea
              className="mono"
              value={originalText}
              readOnly
            />
          </div>

          {/* Typing */}
          <div className="card">
            <h3>Type Here</h3>
            <textarea
              className="mono"
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
            />

            <button
              className={`primary-btn ${loading ? "loading" : ""}`}
              onClick={calculateMetrics}
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>
          </div>

          {/* Metrics */}
          <div className="card">
            <h3>Metrics</h3>

            <div className="metrics-grid">
              <div className="metric">
                ⚡
                <span>WPM</span>
                <b>{result ? result.wpm : "--"}</b>
              </div>

              <div className="metric">
                🎯
                <span>Accuracy</span>
                <b>{result ? result.accuracy : "--"}</b>
              </div>

              <div className="metric">
                ⏱
                <span>Time</span>
                <b>30s</b>
              </div>

              <div className="metric">
                ❌
                <span>Errors</span>
                <b>{result ? 100 - result.accuracy : "--"}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
