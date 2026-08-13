import React, { useState, useEffect } from "react";
import { COLORS } from "../constants.js";
import ModeToggle from "./ModeToggle.jsx";
import TeamCodeManager from "./TeamCodeManager.jsx";
import CardDeck from "./CardDeck.jsx";
import PhotoAdjuster from "./PhotoAdjuster.jsx";
import DetailsForm from "./DetailsForm.jsx";
import ActionButtons from "./ActionButtons.jsx";
import DarkModeToggle from "./DarkModeToggle.jsx";

export default function ControlPanel({
  mode,
  onModeChange,
  format,
  onFormatChange,
  activeSlotIndex,
  onSelectSlot,
  slots,
  onFileSelected,
  onClearSlot,
  onZoomChange,
  onOffsetXChange,
  onOffsetYChange,
  onResetAdjuster,
  teamName,
  onTeamNameChange,
  teamCode,
  onTeamCodeChange,
  soloName,
  soloStack,
  onMemberNameChange,
  onMemberStackChange,
  onSoloNameChange,
  onSoloStackChange,
  ready,
  onDownloadCurrent,
  onDownloadAllTeamCards,
}) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", isDark);
  }, [isDark]);

  const currentSlotIndex = typeof activeSlotIndex === "number" ? activeSlotIndex : 0;
  const activeSlot = slots[currentSlotIndex] || null;

  return (
    <div
      style={{
        background: isDark ? "#062819" : "#FBF3DE",
        color: isDark ? "#FFFFFF" : COLORS.ink,
        borderRadius: 20,
        padding: 20,
        width: 400,
        maxWidth: "100%",
        flexShrink: 0,
        boxShadow: isDark
          ? "0 20px 50px rgba(0,0,0,0.6), 0 0 0 2px rgba(232,18,122,0.4)"
          : "0 20px 50px rgba(0,0,0,0.25), 0 0 0 2px rgba(239,193,58,0.6)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Top Header Control Rows */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <div style={{ flex: 2 }}><ModeToggle mode={mode} onChange={onModeChange} /></div>
        <div style={{ flex: 1 }}><DarkModeToggle isDark={isDark} setIsDark={setIsDark} /></div>
      </div>

      {/* Team Unique Code Chip Manager */}
      {mode === "team" && (
        <TeamCodeManager
          teamName={teamName}
          onTeamNameChange={onTeamNameChange}
          teamCode={teamCode}
          onTeamCodeChange={onTeamCodeChange}
        />
      )}

      {/* 3D Animated Card Deck & Swapper */}
      <CardDeck
        mode={mode}
        slots={slots}
        activeSlotIndex={activeSlotIndex}
        onSelectSlot={onSelectSlot}
        onFileSelected={onFileSelected}
        onClearSlot={onClearSlot}
        teamCode={teamCode}
        teamName={teamName}
      />

      {/* Member Details Form (Name & Stack) */}
      {activeSlotIndex !== "combined" && (
        <DetailsForm
          mode={mode}
          activeSlotIndex={activeSlotIndex}
          slots={slots}
          soloName={soloName}
          soloStack={soloStack}
          onMemberNameChange={onMemberNameChange}
          onMemberStackChange={onMemberStackChange}
          onSoloNameChange={onSoloNameChange}
          onSoloStackChange={onSoloStackChange}
        />
      )}

      {/* Photo Alignment Controls */}
      {activeSlotIndex !== "combined" && (
        <PhotoAdjuster
          slot={activeSlot}
          onZoomChange={(val) => onZoomChange(currentSlotIndex, val)}
          onOffsetXChange={(val) => onOffsetXChange(currentSlotIndex, val)}
          onOffsetYChange={(val) => onOffsetYChange(currentSlotIndex, val)}
          onReset={() => onResetAdjuster(currentSlotIndex)}
        />
      )}

      {/* Primary Actions (Download & Share to X) */}
      <ActionButtons
        mode={mode}
        format={format}
        ready={ready}
        activeSlotIndex={activeSlotIndex}
        slots={slots}
        teamName={teamName}
        teamCode={teamCode}
        soloName={soloName}
        onDownloadCurrent={onDownloadCurrent}
        onDownloadAllTeamCards={onDownloadAllTeamCards}
      />
    </div>
  );
}
