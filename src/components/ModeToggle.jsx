import React from "react";
import { User, Users } from "lucide-react";
import { COLORS } from "../constants.js";

export default function ModeToggle({ mode, onChange }) {
  const btn = (key, label, Icon) => (
    <button
      className="hhg-btn"
      onClick={() => onChange(key)}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "10px 8px",
        borderRadius: 999,
        border: `2px solid ${COLORS.green}`,
        background: mode === key ? COLORS.green : "transparent",
        color: mode === key ? COLORS.cream : COLORS.green,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
        fontSize: 13,
        cursor: "pointer",
      }}
    >
      <Icon size={16} /> {label}
    </button>
  );

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      {btn("solo", "Solo", User)}
      {btn("team", "Team (up to 4)", Users)}
    </div>
  );
}
