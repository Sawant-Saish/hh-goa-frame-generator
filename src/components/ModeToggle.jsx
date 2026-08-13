import React from "react";
import { User, Users } from "lucide-react";
import { COLORS } from "../constants.js";

export default function ModeToggle({ mode, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        background: "rgba(11, 110, 62, 0.12)",
        padding: 4,
        borderRadius: 12,
        width: "100%",
      }}
    >
      <button
        type="button"
        onClick={() => onChange("solo")}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "9px 10px",
          borderRadius: 8,
          border: mode === "solo" ? `1.5px solid ${COLORS.gold}` : "1.5px solid transparent",
          background: mode === "solo" ? COLORS.green : "transparent",
          color: mode === "solo" ? "#FFFFFF" : "inherit",
          fontWeight: 800,
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: mode === "solo" ? "0 4px 12px rgba(11,110,62,0.4)" : "none",
        }}
      >
        <User size={15} /> Solo Builder
      </button>

      <button
        type="button"
        onClick={() => onChange("team")}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "9px 10px",
          borderRadius: 8,
          border: mode === "team" ? `1.5px solid ${COLORS.gold}` : "1.5px solid transparent",
          background: mode === "team" ? COLORS.green : "transparent",
          color: mode === "team" ? "#FFFFFF" : "inherit",
          fontWeight: 800,
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: mode === "team" ? "0 4px 12px rgba(11,110,62,0.4)" : "none",
        }}
      >
        <Users size={15} /> Team Squad (1-3)
      </button>
    </div>
  );
}
