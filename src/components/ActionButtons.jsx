import React from "react";
import { Download, Send } from "lucide-react";
import { COLORS } from "../constants.js";

function buildShareText(mode) {
  return `Generated my HH Goa 2026 ${mode === "team" ? "team " : ""}frame with a quick web tool — upload a photo, it auto-fits and brands it, done in seconds. #FrameInGoa`;
}

export default function ActionButtons({ mode, name, ready, onDownload }) {
  const handleShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(buildShareText(mode))}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <button
          className="hhg-btn"
          disabled={!ready}
          onClick={() => onDownload(name)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "12px 10px",
            borderRadius: 999,
            border: "none",
            background: COLORS.pink,
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
          }}
        >
          <Download size={16} /> Download
        </button>
        <button
          className="hhg-btn"
          onClick={handleShare}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "12px 10px",
            borderRadius: 999,
            border: `2px solid ${COLORS.pink}`,
            background: "transparent",
            color: COLORS.pink,
            fontWeight: 700,
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
          }}
        >
          <Send size={16} /> Share to X
        </button>
      </div>
      <p style={{ fontSize: 11, color: "rgba(15,42,27,0.5)", marginTop: 10, lineHeight: 1.4 }}>
        X's compose window can't pull in an image by link — download the PNG first, then attach it in the X
        tab that opens.
      </p>
    </>
  );
}
