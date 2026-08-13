import React, { useEffect, useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { COLORS, FORMATS } from "../constants.js";

export default function PreviewCanvas({
  canvasRef,
  rendering,
  format,
  mode,
  activeSlotIndex,
  teamCode,
}) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 500);
    return () => clearTimeout(t);
  }, [format, mode, activeSlotIndex]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      {/* Live Badge Format Status Tag (Positioned cleanly ABOVE the canvas) */}
      <div
        style={{
          background: "rgba(6, 40, 25, 0.92)",
          color: COLORS.cream,
          fontSize: 12,
          fontWeight: 800,
          padding: "6px 16px",
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          gap: 6,
          border: "1.5px solid rgba(239,193,58,0.5)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Sparkles size={14} color={COLORS.gold} />
        HH Goa 2026 Builder Badge
        {mode === "team" && (
          <span style={{ color: COLORS.goldLight }}>
            [{activeSlotIndex === "combined" ? "Combined Squad Poster" : `Card 0${activeSlotIndex + 1}`}]
          </span>
        )}
      </div>

      <div
        className={`perspective-container ${animating ? "canvas-swap-anim" : ""}`}
        style={{
          width: 480,
          maxWidth: "90vw",
          aspectRatio: "1",
          borderRadius: 20,
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
          border: `2.5px solid ${COLORS.gold}`,
          background: COLORS.greenDeep,
          transition: "transform 0.3s ease",
        }}
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

        {rendering && (
          <div
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              background: "rgba(6, 40, 25, 0.88)",
              color: COLORS.gold,
              fontSize: 11,
              padding: "6px 12px",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              gap: 6,
              backdropFilter: "blur(4px)",
            }}
          >
            <RefreshCw size={14} className="hhg-spin" /> Rendering
          </div>
        )}
      </div>
    </div>
  );
}
