import React, { useState } from "react";

function App() {
  const [originalText, setOriginalText] = useState("hello world");
  const [typedText, setTypedText] = useState("");
  const [result, setResult] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Upload PDF
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
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
    } catch (err) {
      setError("Upload failed. Try again.");
    }

    setLoading(false);
  };

  const calculateMetrics = async () => {
    setLoading(true);
    setError("");

    try {
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
    } catch (err) {
      setError("Metrics calculation failed.");
    }

    setLoading(false);
  };

  // ⭐ CARD STYLE (NEW UI LOOK)
  const cardStyle = {
    background: "white",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  };

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "Arial",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>TypeFlow Lite</h2>

      {/* Upload */}
      <input type="file" accept="application/pdf" onChange={handleUpload} />

      {loading && <p style={{ marginTop: 10 }}>Processing...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* AI Summary */}
      {summary && (
        <div style={{ ...cardStyle, marginTop: 15 }}>
          <h4>AI Summary</h4>
          <p>{summary}</p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 260px",
          gap: 20,
          marginTop: 20,
        }}
      >
        {/* Original Text */}
        <div style={cardStyle}>
          <h4>Original Text</h4>
          <textarea
            value={originalText}
            readOnly
            style={{ width: "100%", height: 220 }}
          />
        </div>

        {/* Typing */}
        <div style={cardStyle}>
          <h4>Type Here</h4>
          <textarea
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            style={{ width: "100%", height: 220 }}
          />

          <br />
          <br />

          <button
            onClick={calculateMetrics}
            disabled={loading}
            style={{
              background: "#4f46e5",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {loading ? "Processing..." : "Calculate"}
          </button>
        </div>

        {/* Metrics */}
        <div style={cardStyle}>
          <h4>Metrics</h4>
          {result ? (
            <>
              <p>
                <b>Accuracy:</b> {result.accuracy}
              </p>
              <p>
                <b>WPM:</b> {result.wpm}
              </p>
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
