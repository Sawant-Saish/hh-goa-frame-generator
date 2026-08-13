import React, { useState, useCallback, useEffect } from "react";
import { COLORS, FORMATS, MAX_TEAM_SLOTS } from "./constants.js";
import { loadImage } from "./utils/canvasDraw.js";
import { generateTeamCode } from "./utils/identity.js";
import { useFrameRenderer } from "./hooks/useFrameRenderer.js";
import ControlPanel from "./components/ControlPanel.jsx";
import PreviewCanvas from "./components/PreviewCanvas.jsx";

const createEmptySlot = (index) => ({
  src: null,
  img: null,
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  name: index === 0 ? "" : `Member ${index + 1}`,
  stack: "",
});

export default function App() {
  const [format, setFormat] = useState(FORMATS.BADGE); // FORMATS.PFP | FORMATS.BADGE
  const [mode, setMode] = useState("solo"); // "solo" | "team"
  const [activeSlotIndex, setActiveSlotIndex] = useState(0); // 0, 1, 2, 3, or "combined"
  
  const [teamName, setTeamName] = useState("CYBER BUILDERS");
  const [teamCode, setTeamCode] = useState(() => generateTeamCode("GOA"));
  
  const [soloName, setSoloName] = useState("");
  const [soloStack, setSoloStack] = useState("");

  const [slots, setSlots] = useState(() => [
    createEmptySlot(0),
    createEmptySlot(1),
    createEmptySlot(2),
    createEmptySlot(3),
  ]);

  // Read URL query params on mount for shareable Team Links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTeam = params.get("team");
    const urlName = params.get("name");

    if (urlTeam) {
      setMode("team");
      setTeamCode(urlTeam.toUpperCase());
      if (urlName) setTeamName(urlName);
    }
  }, []);

  const handleFileSelected = useCallback(async (index, file) => {
    if (!file) return;
    try {
      const src = URL.createObjectURL(file);
      const img = await loadImage(src);

      setSlots((prev) => {
        const next = [...prev];
        next[index] = {
          ...next[index],
          src,
          img,
          zoom: 1,
          offsetX: 0,
          offsetY: 0,
        };
        return next;
      });
    } catch (err) {
      console.error("Failed to load image", err);
    }
  }, []);

  const handleClearSlot = useCallback((index) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = {
        ...createEmptySlot(index),
      };
      return next;
    });
  }, []);

  const handleZoomChange = useCallback((index, zoom) => {
    setSlots((prev) => {
      const next = [...prev];
      if (next[index]) next[index] = { ...next[index], zoom };
      return next;
    });
  }, []);

  const handleOffsetXChange = useCallback((index, offsetX) => {
    setSlots((prev) => {
      const next = [...prev];
      if (next[index]) next[index] = { ...next[index], offsetX };
      return next;
    });
  }, []);

  const handleOffsetYChange = useCallback((index, offsetY) => {
    setSlots((prev) => {
      const next = [...prev];
      if (next[index]) next[index] = { ...next[index], offsetY };
      return next;
    });
  }, []);

  const handleResetAdjuster = useCallback((index) => {
    setSlots((prev) => {
      const next = [...prev];
      if (next[index]) next[index] = { ...next[index], zoom: 1, offsetX: 0, offsetY: 0 };
      return next;
    });
  }, []);

  const handleMemberNameChange = useCallback((index, name) => {
    setSlots((prev) => {
      const next = [...prev];
      if (next[index]) next[index] = { ...next[index], name };
      return next;
    });
  }, []);

  const handleMemberStackChange = useCallback((index, stack) => {
    setSlots((prev) => {
      const next = [...prev];
      if (next[index]) next[index] = { ...next[index], stack };
      return next;
    });
  }, []);

  const {
    canvasRef,
    rendering,
    ready,
    downloadCurrent,
    downloadAllTeamCards,
  } = useFrameRenderer({
    format,
    mode,
    slots,
    activeSlotIndex,
    teamName,
    teamCode,
    soloName,
    soloStack,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(circle at 50% 0%, #0B6E3E 0%, ${COLORS.greenDeep} 75%)`,
        color: COLORS.cream,
        padding: "30px 16px 60px",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Header Badge */}
      <div
        style={{
          color: COLORS.gold,
          fontSize: 12,
          letterSpacing: "0.18em",
          fontWeight: 800,
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        🌴 HH GOA 2026 · NO CAP BUILDER BADGE GENERATOR
      </div>

      <h1
        style={{
          fontFamily: "Georgia, 'Playfair Display', serif",
          fontSize: "clamp(30px, 4.5vw, 52px)",
          textAlign: "center",
          margin: "6px 0 8px",
          color: COLORS.cream,
          textShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        Flex Your Stack. Claim Your Aura. ✨
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "rgba(251,243,222,0.88)",
          fontSize: 14,
          maxWidth: 640,
          margin: "0 auto 28px",
          lineHeight: 1.6,
        }}
      >
        Generate your official <strong>HH Goa 2026 Builder Badge</strong> with scannable QR verification,
        funky tech titles, and polite Gen-Z roasts. Built for <strong>Solo Builders</strong> & <strong>Squads of 4</strong>! 🚀
      </p>

      {/* Main Container */}
      <div
        style={{
          display: "flex",
          gap: 24,
          maxWidth: 960,
          margin: "0 auto",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <ControlPanel
          mode={mode}
          onModeChange={setMode}
          format={format}
          onFormatChange={setFormat}
          activeSlotIndex={activeSlotIndex}
          onSelectSlot={setActiveSlotIndex}
          slots={slots}
          onFileSelected={handleFileSelected}
          onClearSlot={handleClearSlot}
          onZoomChange={handleZoomChange}
          onOffsetXChange={handleOffsetXChange}
          onOffsetYChange={handleOffsetYChange}
          onResetAdjuster={handleResetAdjuster}
          teamName={teamName}
          onTeamNameChange={setTeamName}
          teamCode={teamCode}
          onTeamCodeChange={setTeamCode}
          soloName={soloName}
          soloStack={soloStack}
          onMemberNameChange={handleMemberNameChange}
          onMemberStackChange={handleMemberStackChange}
          onSoloNameChange={setSoloName}
          onSoloStackChange={setSoloStack}
          ready={ready}
          onDownloadCurrent={downloadCurrent}
          onDownloadAllTeamCards={downloadAllTeamCards}
        />

        <PreviewCanvas
          canvasRef={canvasRef}
          rendering={rendering}
          format={format}
          mode={mode}
          activeSlotIndex={activeSlotIndex}
          teamCode={teamCode}
        />
      </div>
    </div>
  );
}
