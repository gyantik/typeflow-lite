import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [originalText, setOriginalText] = useState("hello world");
  const [typedText, setTypedText] = useState("");
  const [result, setResult] = useState(null);
  const [summary, setSummary] = useState("");

  // ⭐ Upload PDF
  const handleUpload = async (e) => {
    const file = e.target.files[0];
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

  // ⭐ AUTO CALCULATE METRICS WHILE TYPING
  useEffect(() => {
    if (!typedText) return;

    const calculate = async () => {
      const response = await fetch(
        "https://typeflow-lite.onrender.com/api/metrics",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            original_text: originalText,
            typed_text: typedText,
            time_seconds: 30,
          }),
        }
      );

      const data = await response.json();
      setResult(data);
    };

    calculate();
  }, [typedText]);

  // ⭐ IMMERSIVE TEXT DIFF RENDER
  const renderText = () => {
    return originalText.split("").map((char, index) => {
      let className = "char";

      if (typedText[index] == null) {
        className += " pending";
      } else if (typedText[index] === char) {
        className += " correct";
      } else {
        className += " incorrect";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <h1>
          <span className="brand">TypeFlow</span> Lite
        </h1>
      </header>

      {/* FILE UPLOAD */}
      <input type="file" accept="application/pdf" onChange={handleUpload} />

      {/* AI SUMMARY */}
      {summary && (
        <div className="summaryCard">
          <h3>AI Summary</h3>
          <p>{summary}</p>
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid">
        {/* IMMERSIVE TYPING CARD */}
        <div className="card typingCard">
          <h3>Typing Editor</h3>

          <div className="typingArea">
            <div className="overlayText">{renderText()}</div>

            <textarea
              spellCheck="false"
              autoComplete="off"
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              className="hiddenInput"
            />
          </div>
        </div>

        {/* METRICS PANEL */}
        <div className="card metricsCard">
          <h3>Metrics</h3>

          <div className="metricsGrid">
            <div className="statTile">
              <div className="value">
                {result ? result.wpm : "--"}
              </div>
              <div className="label">WPM</div>
            </div>

            <div className="statTile">
              <div className="value">
                {result ? result.accuracy : "--"}
              </div>
              <div className="label">Accuracy</div>
            </div>

            <div className="statTile">
              <div className="value">{typedText.length}</div>
              <div className="label">Chars</div>
            </div>

            <div className="statTile">
              <div className="value">
                {typedText.length - originalText.length}
              </div>
              <div className="label">Diff</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
