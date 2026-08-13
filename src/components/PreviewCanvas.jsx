import React from "react";
import { RefreshCw } from "lucide-react";

export default function PreviewCanvas({ canvasRef, rendering }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div
        style={{
          width: 400,
          height: 400,
          borderRadius: 20,
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
        {rendering && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              background: "rgba(0,0,0,0.5)",
              color: "#FBF3DE",
              fontSize: 10,
              padding: "4px 8px",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <RefreshCw size={12} className="hhg-spin" /> rendering
          </div>
        )}
      </div>
    </div>
  );
}
