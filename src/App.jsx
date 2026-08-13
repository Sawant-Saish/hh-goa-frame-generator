import React, { useState, useCallback, useEffect } from "react";
import { COLORS, MAX_TEAM_SLOTS } from "./constants.js";
import { loadImage } from "./utils/canvasDraw.js";
import { useFrameRenderer } from "./hooks/useFrameRenderer.js";
import ControlPanel from "./components/ControlPanel.jsx";
import PreviewCanvas from "./components/PreviewCanvas.jsx";

export default function App() {
  const [mode, setMode] = useState("solo"); // "solo" | "team"
  const [slots, setSlots] = useState([null]);
  const [name, setName] = useState("");
  const [stack, setStack] = useState("");

  const maxSlots = mode === "team" ? MAX_TEAM_SLOTS : 1;

  // Resize the slots array to match the active mode, preserving
  // any photos already in the kept slots.
  useEffect(() => {
    setSlots((prev) => {
      const next = prev.slice(0, maxSlots);
      while (next.length < maxSlots) next.push(null);
      return next;
    });
  }, [maxSlots]);

  const handleFileSelected = useCallback(async (index, file) => {
    if (!file) return;
    const src = URL.createObjectURL(file);
    const img = await loadImage(src);
    setSlots((prev) => {
      const next = [...prev];
      next[index] = { src, img };
      return next;
    });
  }, []);

  const handleClearSlot = useCallback((index) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  const { canvasRef, rendering, ready, download } = useFrameRenderer({ slots, name, stack });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${COLORS.green} 0%, ${COLORS.greenDeep} 100%)`,
        color: COLORS.cream,
        padding: "40px 24px 60px",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div
        style={{
          color: COLORS.gold,
          fontSize: 13,
          letterSpacing: "0.14em",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        BUILD THIS · TASK #1
      </div>
      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          textAlign: "center",
          margin: "8px 0 6px",
          color: COLORS.cream,
        }}
      >
        HH Goa Frame Generator
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "rgba(251,243,222,0.7)",
          fontSize: 14,
          maxWidth: 520,
          margin: "0 auto 32px",
          lineHeight: 1.5,
        }}
      >
        Upload a photo, it auto-fits the frame — no cropping. Add your name and stack, download, and share.
      </p>

      <div
        style={{
          display: "flex",
          gap: 28,
          maxWidth: 980,
          margin: "0 auto",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <ControlPanel
          mode={mode}
          onModeChange={setMode}
          slots={slots}
          onFileSelected={handleFileSelected}
          onClearSlot={handleClearSlot}
          name={name}
          stack={stack}
          onNameChange={setName}
          onStackChange={setStack}
          ready={ready}
          onDownload={download}
        />
        <PreviewCanvas canvasRef={canvasRef} rendering={rendering} />
      </div>
    </div>
  );
}
