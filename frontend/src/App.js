import React, { useState } from "react";

function App() {
  const [originalText, setOriginalText] = useState("hello world");
  const [typedText, setTypedText] = useState("");
  const [result, setResult] = useState(null);
  const [summary, setSummary] = useState("");

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

  // ⭐ Animated Card Style
  const cardStyle = {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    borderRadius: 16,
    padding: 20,
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    transition: "0.25s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        fontFamily: "Segoe UI",
        background:
          "linear-gradient(135deg, #eef2ff, #fdf2f8, #ecfeff)",
      }}
    >
      <h1
        style={{
          marginBottom: 20,
          color: "#312e81",
        }}
      >
        ✨ TypeFlow Lite
      </h1>

      <input type="file" accept="application/pdf" onChange={handleUpload} />

      {/* AI Summary */}
      {summary && (
        <div style={{ ...cardStyle, marginTop: 20 }}>
          <h3 style={{ color: "#4f46e5" }}>AI Summary</h3>
          <p>{summary}</p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 260px",
          gap: 25,
          marginTop: 25,
        }}
      >
        {/* Original */}
        <div style={cardStyle}>
          <h3 style={{ color: "#4338ca" }}>Original Text</h3>
          <textarea
            value={originalText}
            readOnly
            style={{
              width: "100%",
              height: 230,
              borderRadius: 10,
              border: "1px solid #ddd",
              padding: 10,
            }}
          />
        </div>

        {/* Typing */}
        <div style={cardStyle}>
          <h3 style={{ color: "#4338ca" }}>Type Here</h3>

          <textarea
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            style={{
              width: "100%",
              height: 230,
              borderRadius: 10,
              border: "1px solid #ddd",
              padding: 10,
            }}
          />

          <br />
          <br />

          <button
            onClick={calculateMetrics}
            style={{
              background:
                "linear-gradient(135deg,#6366f1,#a855f7)",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
              transition: "0.2s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.target.style.transform = "scale(1)")
            }
          >
            Calculate
          </button>
        </div>

        {/* Metrics */}
        <div style={cardStyle}>
          <h3 style={{ color: "#4338ca" }}>Metrics</h3>

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
