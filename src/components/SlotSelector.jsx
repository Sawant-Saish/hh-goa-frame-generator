import React from "react";
import { User, Grid, CheckCircle2 } from "lucide-react";
import { COLORS } from "../constants.js";

export default function SlotSelector({
  slots,
  activeSlotIndex,
  onSelectSlot,
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: COLORS.green,
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        Select Card to Edit & Preview
      </label>

      <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 4 }}>
        {slots.map((slot, i) => {
          const isActive = activeSlotIndex === i;
          const hasPhoto = Boolean(slot && slot.img);
          const hasName = Boolean(slot && slot.name);

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectSlot(i)}
              style={{
                flex: 1,
                minWidth: 64,
                padding: "8px 4px",
                borderRadius: 8,
                border: isActive ? `2px solid ${COLORS.pink}` : "1px solid rgba(9,29,20,0.15)",
                background: isActive ? COLORS.pink : hasPhoto ? "rgba(11, 110, 62, 0.12)" : "#fff",
                color: isActive ? "#fff" : COLORS.ink,
                fontWeight: 700,
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <User size={12} /> Card {i + 1}
              </div>
              <span style={{ fontSize: 9, opacity: 0.8, fontWeight: 500 }}>
                {hasName ? slot.name.slice(0, 8) : hasPhoto ? "Photo set" : "Empty"}
              </span>
            </button>
          );
        })}

        {/* 4-in-1 Combined Team Poster View */}
        <button
          type="button"
          onClick={() => onSelectSlot("combined")}
          style={{
            flex: 1.2,
            minWidth: 84,
            padding: "8px 4px",
            borderRadius: 8,
            border: activeSlotIndex === "combined" ? `2px solid ${COLORS.pink}` : "1px solid rgba(9,29,20,0.15)",
            background: activeSlotIndex === "combined" ? COLORS.pink : "rgba(239,193,58,0.2)",
            color: activeSlotIndex === "combined" ? "#fff" : COLORS.ink,
            fontWeight: 800,
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            transition: "all 0.15s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Grid size={12} /> 4-in-1 Poster
          </div>
          <span style={{ fontSize: 9, opacity: 0.8, fontWeight: 600 }}>All 4 Squad</span>
        </button>
      </div>
    </div>
  );
}
