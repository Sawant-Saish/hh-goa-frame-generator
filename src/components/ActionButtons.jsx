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
  teamSize = 4,
  onDownloadCurrent,
  onDownloadAllTeamCards,
  onOpenShareModal,
}) {
  const isTeam = mode === "team";

  const handleShareCurrentToInstagram = async () => {
    let caption = "";
    if (isTeam) {
      const activeSlot = slots[activeSlotIndex];
      const memberName = activeSlot?.name || `Member ${typeof activeSlotIndex === "number" ? activeSlotIndex + 1 : 1}`;
      caption = `Just generated my official HH Goa 2026 Builder Card for Team ${teamName || "Squad"} [ID: ${teamCode}]! 🌴\n\nBuilder: ${memberName}\n\nJoin the squad with ID ${teamCode} at hhgoa.com! #HHGoa2026 #FrameInGoa @HHGoa2026`;
    } else {
      const bName = soloName || "Builder";
      caption = `Just generated my official HH Goa 2026 Graphic! Ready to build in Goa. 🌴\n\nBuilder: ${bName}\nCreate yours at hhgoa.com! #HHGoa2026 #FrameInGoa @HHGoa2026`;
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
          onClick={onOpenShareModal}
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
            TEAM ID: {teamCode} ({teamSize} Members)
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
            <Layers size={14} /> Download All {teamSize} Cards
          </button>

          <button
            type="button"
            className="hhg-btn"
            onClick={onOpenShareModal}
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
            <Share2 size={14} /> Post Squad to X
          </button>
        </div>
      )}
    </div>
  );
}
