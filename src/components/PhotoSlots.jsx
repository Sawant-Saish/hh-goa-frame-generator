import React, { useRef } from "react";
import { Upload, X, CheckCircle } from "lucide-react";
import { COLORS } from "../constants.js";

export default function PhotoSlots({
  slots,
  mode,
  activeSlotIndex,
  onSelectSlot,
  onFileSelected,
  onClearSlot,
}) {
  const fileInputRefs = useRef([]);

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
        {mode === "team" ? "Team Member Photo Slots (1-4)" : "Upload Photo"}
      </label>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: mode === "team" ? "repeat(4, 1fr)" : "1fr",
          gap: 8,
        }}
      >
        {slots.map((slot, i) => {
          const isSelected = mode === "team" && activeSlotIndex === i;

          return (
            <div
              key={i}
              className="hhg-slot"
              onClick={() => {
                if (mode === "team") onSelectSlot(i);
                fileInputRefs.current[i]?.click();
              }}
              style={{
                position: "relative",
                aspectRatio: "1",
                borderRadius: 12,
                border: isSelected
                  ? `2.5px solid ${COLORS.pink}`
                  : slot
                  ? `2px solid ${COLORS.green}`
                  : "2px dashed rgba(15,42,27,0.3)",
                overflow: "hidden",
                cursor: "pointer",
                background: isSelected ? "rgba(232,18,122,0.06)" : "rgba(11,110,62,0.05)",
                boxShadow: isSelected ? "0 0 12px rgba(232,18,122,0.25)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              <input
                ref={(el) => (fileInputRefs.current[i] = el)}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => onFileSelected(i, e.target.files?.[0])}
              />

              {slot && slot.src ? (
                <>
                  <img
                    src={slot.src}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  {mode === "team" && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "rgba(6,40,25,0.85)",
                        color: COLORS.cream,
                        fontSize: 9,
                        fontWeight: 700,
                        textAlign: "center",
                        padding: "2px 4px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {slot.name || `Member ${i + 1}`}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearSlot(i);
                    }}
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: "none",
                      background: COLORS.pink,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      zIndex: 2,
                    }}
                  >
                    <X size={11} />
                  </button>
                </>
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    padding: 4,
                  }}
                >
                  <Upload size={mode === "team" ? 16 : 22} color={COLORS.pink} />
                  <span
                    style={{
                      fontSize: mode === "team" ? 9 : 12,
                      color: "rgba(15,42,27,0.6)",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    {mode === "team" ? `Slot 0${i + 1}` : "Upload Photo"}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
