import React from "react";
import { UserCheck, BadgeCheck } from "lucide-react";
import { COLORS, FORMATS } from "../constants.js";

export default function FormatToggle({ format, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        background: "rgba(11, 110, 62, 0.08)",
        padding: 4,
        borderRadius: 12,
        width: "100%",
        marginBottom: 8,
      }}
    >
      <button
        type="button"
        onClick={() => onChange(FORMATS.PFP)}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "8px 10px",
          borderRadius: 8,
          border: "none",
          background: format === FORMATS.PFP ? COLORS.pink : "transparent",
          color: format === FORMATS.PFP ? "#fff" : COLORS.ink,
          fontWeight: 800,
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
      >
        <UserCheck size={15} /> Format A: PFP Frame
      </button>

      <button
        type="button"
        onClick={() => onChange(FORMATS.BADGE)}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "8px 10px",
          borderRadius: 8,
          border: "none",
          background: format === FORMATS.BADGE ? COLORS.pink : "transparent",
          color: format === FORMATS.BADGE ? "#fff" : COLORS.ink,
          fontWeight: 800,
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
      >
        <BadgeCheck size={15} /> Format B: Builder Badge
      </button>
    </div>
  );
}
