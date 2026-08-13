import React, { useState } from "react";
import { Sliders, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { COLORS } from "../constants.js";

export default function PhotoAdjuster({
  slot,
  onZoomChange,
  onOffsetXChange,
  onOffsetYChange,
  onReset,
}) {
  const [expanded, setExpanded] = useState(false);
  if (!slot || !slot.img) return null;

  return (
    <div
      style={{
        background: "rgba(11, 110, 62, 0.14)",
        borderRadius: 10,
        padding: "8px 12px",
        marginBottom: 14,
        border: `1.5px solid ${COLORS.green}`,
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 800, color: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
          <Sliders size={13} color={COLORS.pink} /> Photo Fit Controls {slot.zoom > 1 || slot.offsetX || slot.offsetY ? "(Modified)" : ""}
        </span>
        
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
            style={{
              background: "none",
              border: "none",
              color: COLORS.pink,
              fontSize: 11,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontWeight: 800,
            }}
          >
            <RotateCcw size={11} /> Reset
          </button>

          {expanded ? <ChevronUp size={15} color="inherit" /> : <ChevronDown size={15} color="inherit" />}
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed rgba(11,110,62,0.3)" }}>
          {/* Zoom Control */}
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "inherit", marginBottom: 2 }}>
              <span>Zoom Scale</span>
              <span style={{ color: COLORS.pink }}>{Math.round((slot.zoom || 1) * 100)}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.05"
              value={slot.zoom || 1}
              onChange={(e) => onZoomChange(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: COLORS.pink, cursor: "pointer", height: 6 }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "inherit", marginBottom: 2 }}>
                <span>Pan X</span>
                <span style={{ color: COLORS.pink }}>{slot.offsetX || 0}%</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={slot.offsetX || 0}
                onChange={(e) => onOffsetXChange(parseInt(e.target.value, 10))}
                style={{ width: "100%", accentColor: COLORS.pink, cursor: "pointer", height: 6 }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "inherit", marginBottom: 2 }}>
                <span>Pan Y</span>
                <span style={{ color: COLORS.pink }}>{slot.offsetY || 0}%</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={slot.offsetY || 0}
                onChange={(e) => onOffsetYChange(parseInt(e.target.value, 10))}
                style={{ width: "100%", accentColor: COLORS.pink, cursor: "pointer", height: 6 }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
