import React, { useRef } from "react";
import { Upload, X } from "lucide-react";
import { COLORS } from "../constants.js";

export default function PhotoSlots({ slots, mode, onFileSelected, onClearSlot }) {
  const fileInputRefs = useRef([]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 8,
        marginBottom: 18,
      }}
    >
      {slots.map((slot, i) => (
        <div
          key={i}
          className="hhg-slot"
          onClick={() => fileInputRefs.current[i]?.click()}
          style={{
            position: "relative",
            aspectRatio: "1",
            borderRadius: 12,
            border: "2px dashed rgba(15,42,27,0.3)",
            overflow: "hidden",
            cursor: "pointer",
            background: "rgba(11,110,62,0.05)",
          }}
        >
          <input
            ref={(el) => (fileInputRefs.current[i] = el)}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => onFileSelected(i, e.target.files?.[0])}
          />
          {slot ? (
            <>
              <img src={slot.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClearSlot(i);
                }}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: "none",
                  background: COLORS.pink,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={12} />
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
                gap: 6,
              }}
            >
              <Upload size={20} color={COLORS.pink} />
              <span style={{ fontSize: 11, color: "rgba(15,42,27,0.55)" }}>
                {mode === "team" ? `Slot ${i + 1}` : "Upload photo"}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
