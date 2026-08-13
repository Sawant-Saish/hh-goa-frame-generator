import React from "react";
import { Download, Share2, Layers, Send, Clipboard, Instagram } from "lucide-react";
import { COLORS } from "../constants.js";

export default function ActionButtons({
  mode,
  format,
  ready,
  activeSlotIndex,
  slots,
  teamName,
  teamCode,
  soloName,
  onDownloadCurrent,
  onDownloadAllTeamCards,
}) {
  const isTeam = mode === "team";

  // Share Single Card to X (Web Share API with PNG file attachment + Auto Download fallback)
  const handleShareCurrentToX = async () => {
    let caption = "";
    let activeName = "builder";
    if (isTeam) {
      const activeSlot = slots[activeSlotIndex];
      activeName = activeSlot?.name || `Member ${typeof activeSlotIndex === "number" ? activeSlotIndex + 1 : 1}`;
      caption = `Just generated my official HH Goa 2026 Builder Card for Team ${teamName || "Squad"} [ID: ${teamCode}]! 🌴\n\nBuilder: ${activeName}\n\nJoin the squad with ID ${teamCode} at hhgoa.com! #FrameInGoa @HHGoa2026`;
    } else {
      activeName = soloName || "Builder";
      caption = `Just generated my official HH Goa 2026 Builder Badge! Ready to build in Goa. 🌴\n\nBuilder: ${activeName}\nCreate yours at hhgoa.com! #FrameInGoa @HHGoa2026`;
    }

    const canvas = document.querySelector("canvas");

    // Attempt Native OS Share Sheet with attached PNG image file (Mobile Safari / Android Chrome)
    if (canvas && navigator.canShare && navigator.share) {
      try {
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
        if (blob) {
          const file = new File([blob], `hh-goa-badge-${teamCode || "builder"}.png`, { type: "image/png" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: "HH Goa 2026 Builder Badge",
              text: caption,
              files: [file],
            });
            return;
          }
        }
      } catch (err) {
        console.log("Web Share fallback to manual share:", err);
      }
    }

    // Fallback for Desktop Browsers: Auto-download PNG + Copy Tweet Text + Open X Composer
    onDownloadCurrent();
    try {
      await navigator.clipboard.writeText(caption);
      alert("📸 Builder Card PNG downloaded to your device & caption copied!\n\nSimply attach the downloaded image file when Twitter/X opens.");
    } catch (e) {
      console.log("Clipboard write fallback");
    }

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;
    window.open(url, "_blank");
  };

  const handleShareCurrentToInstagram = async () => {
    let caption = "";
    if (isTeam) {
      const activeSlot = slots[activeSlotIndex];
      const memberName = activeSlot?.name || `Member ${typeof activeSlotIndex === "number" ? activeSlotIndex + 1 : 1}`;
      caption = `Just generated my official HH Goa 2026 Builder Card for Team ${teamName || "Squad"} [ID: ${teamCode}]! 🌴\n\nBuilder: ${memberName}\n\nJoin the squad with ID ${teamCode} at hhgoa.com! #FrameInGoa @HHGoa2026`;
    } else {
      const bName = soloName || "Builder";
      caption = `Just generated my official HH Goa 2026 Graphic! Ready to build in Goa. 🌴\n\nBuilder: ${bName}\nCreate yours at hhgoa.com! #FrameInGoa @HHGoa2026`;
    }

    onDownloadCurrent();
    try {
      await navigator.clipboard.writeText(caption);
      alert("📸 Builder Card PNG downloaded to your device & caption copied!\n\nUpload the downloaded card image to your Instagram Story or Feed.");
    } catch (e) {
      // fallback
    }
    window.open("https://www.instagram.com/", "_blank");
  };

  const handleCopyTeamId = () => {
    if (teamCode) {
      navigator.clipboard.writeText(teamCode).then(() => {
        alert("Team ID copied to clipboard!");
      });
    }
  };

  // Share All 4 Squad IDs Together to X
  const handleShareAll4ToX = async () => {
    const squadNames = slots.map((s, i) => s?.name || `Member 0${i + 1}`).join(", ");
    const caption = `Our squad is LOCKED IN for HH Goa 2026! 🚀🌴\n\nTeam: ${teamName || "Cyber Builders"} [Team ID: ${teamCode}]\nSquad Members: ${squadNames}\n\nAll 4 Builder Cards generated at hhgoa.com! #FrameInGoa @HHGoa2026`;

    onDownloadAllTeamCards();
    try {
      await navigator.clipboard.writeText(caption);
      alert("📸 All 4 Squad Cards & Poster PNGs downloaded to your device & caption copied!\n\nAttach the downloaded images when Twitter/X opens.");
    } catch (e) {
      // fallback
    }
    
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Primary Action Row: Download & Share current */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          className="hhg-btn"
          disabled={!ready}
          onClick={() => onDownloadCurrent()}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "12px 8px",
            borderRadius: 999,
            border: "none",
            background: COLORS.pink,
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(232,18,122,0.4)",
          }}
        >
          <Download size={15} /> Download Graphic
        </button>

        <button
          type="button"
          className="hhg-btn"
          onClick={handleShareCurrentToX}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "12px 8px",
            borderRadius: 999,
            border: "none",
            background: "#1D9BF0",
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(29,155,240,0.4)",
          }}
        >
          <Send size={15} /> Share to X
        </button>

        <button
          type="button"
          className="hhg-btn"
          onClick={handleShareCurrentToInstagram}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "12px 8px",
            borderRadius: 999,
            border: "none",
            background: "#E1306C",
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(225,48,108,0.4)",
          }}
        >
          <Instagram size={15} /> Share to Insta
        </button>
      </div>

      {/* Show generated Team ID for reference */}
      {isTeam && (
        <div style={{ marginTop: 8, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 800,
            color: COLORS.pink,
            background: "rgba(232,18,122,0.14)",
            border: `1px solid ${COLORS.pink}`,
            padding: "6px 12px",
            borderRadius: 8,
          }}>
            TEAM ID: {teamCode}
          </span>
          <button
            type="button"
            onClick={handleCopyTeamId}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: `1.5px solid ${COLORS.pink}`,
              background: COLORS.pink,
              color: "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            <Clipboard size={12} /> Copy
          </button>
        </div>
      )}

      {/* Team Specific Action Row */}
      {isTeam && (
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button
            type="button"
            className="hhg-btn"
            onClick={onDownloadAllTeamCards}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "11px 8px",
              borderRadius: 999,
              border: `1.5px solid ${COLORS.green}`,
              background: COLORS.green,
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(11,110,62,0.3)",
            }}
          >
            <Layers size={14} /> Download All 4 Cards
          </button>

          <button
            type="button"
            className="hhg-btn"
            onClick={handleShareAll4ToX}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "11px 8px",
              borderRadius: 999,
              border: `1.5px solid ${COLORS.gold}`,
              background: COLORS.gold,
              color: COLORS.ink,
              fontWeight: 800,
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(239,193,58,0.3)",
            }}
          >
            <Share2 size={14} /> Post All 4 to X
          </button>
        </div>
      )}

    </div>
  );
}
