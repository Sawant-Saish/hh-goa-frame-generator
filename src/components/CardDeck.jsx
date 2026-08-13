import React, { useState } from "react";
import { Upload, X, ChevronLeft, ChevronRight, Grid, Sparkles } from "lucide-react";
import { COLORS } from "../constants.js";
import { builderClass } from "../utils/identity.js";

export default function CardDeck({
  mode,
  slots,
  activeSlotIndex,
  onSelectSlot,
  onFileSelected,
  onClearSlot,
  teamCode,
  teamName,
}) {
  const [animatingIndex, setAnimatingIndex] = useState(null);

  const isTeam = mode === "team";
  const currentSlotIndex = typeof activeSlotIndex === "number" ? activeSlotIndex : 0;
  const isCombined = activeSlotIndex === "combined";

  const handleCardClick = (targetIndex) => {
    if (activeSlotIndex === targetIndex) return;
    setAnimatingIndex(targetIndex);
    onSelectSlot(targetIndex);
    setTimeout(() => setAnimatingIndex(null), 450);
  };

  const handlePrev = () => {
    if (isCombined) {
      handleCardClick(3);
      return;
    }
    const nextIdx = (currentSlotIndex - 1 + 4) % 4;
    handleCardClick(nextIdx);
  };

  const handleNext = () => {
    if (isCombined) {
      handleCardClick(0);
      return;
    }
    const nextIdx = (currentSlotIndex + 1) % 4;
    handleCardClick(nextIdx);
  };

  return (
    <div style={{ marginBottom: 14 }}>
      {/* Team Member Tabs & 4-in-1 Quick Nav Bar */}
      {isTeam && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {[0, 1, 2, 3].map((i) => {
              const isActive = activeSlotIndex === i;
              const hasPhoto = Boolean(slots[i] && slots[i].img);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleCardClick(i)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: 6,
                    border: "none",
                    background: isActive ? COLORS.pink : hasPhoto ? "rgba(11, 110, 62, 0.18)" : "rgba(9, 29, 20, 0.08)",
                    color: isActive ? "#fff" : COLORS.ink,
                    fontWeight: 800,
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  M{i + 1}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => handleCardClick("combined")}
            style={{
              padding: "5px 10px",
              borderRadius: 6,
              border: isCombined ? `1.5px solid ${COLORS.pink}` : "1px solid rgba(9, 29, 20, 0.2)",
              background: isCombined ? COLORS.pink : "rgba(239, 193, 58, 0.25)",
              color: isCombined ? "#fff" : COLORS.ink,
              fontWeight: 800,
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Grid size={12} /> 4-in-1 Poster
          </button>
        </div>
      )}

      {/* 3D Animated Card Stack Display with clean padding wrapper */}
      <div
        className="perspective-container"
        style={{
          position: "relative",
          height: 155,
          padding: isTeam ? "0 28px" : 0,
        }}
      >
        {/* Next / Previous Carousel Controls */}
        {isTeam && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              title="Previous Card"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "none",
                background: COLORS.greenDeep,
                color: COLORS.gold,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              title="Next Card"
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "none",
                background: COLORS.greenDeep,
                color: COLORS.gold,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Display Stacked 3D Card */}
        {isCombined ? (
          <div
            className="active-card-glow"
            style={{
              height: "100%",
              borderRadius: 14,
              background: COLORS.greenDeep,
              border: `2px solid ${COLORS.gold}`,
              color: COLORS.cream,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Sparkles size={22} color={COLORS.gold} style={{ marginBottom: 4 }} />
            <div style={{ fontWeight: 800, fontSize: 15, color: COLORS.gold }}>
              TEAM {teamName.toUpperCase()}
            </div>
            <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>
              Combined 4-Member Squad Grid Badge Poster
            </div>
            <div style={{ fontSize: 10, color: COLORS.pink, fontWeight: 700, marginTop: 4 }}>
              ID: {teamCode}
            </div>
          </div>
        ) : (
          <div
            className={`active-card-glow ${animatingIndex === currentSlotIndex ? "card-swap-anim" : ""}`}
            style={{
              position: "relative",
              height: "100%",
              borderRadius: 14,
              background: "#fff",
              border: `2px solid ${COLORS.pink}`,
              padding: 10,
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            {/* Photo Thumbnail Uploader */}
            <div
              className="hhg-slot"
              style={{
                width: 115,
                height: 115,
                borderRadius: 10,
                border: "2px dashed rgba(15,42,27,0.3)",
                background: "rgba(11,110,62,0.06)",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                flexShrink: 0,
              }}
              onClick={() => {
                const el = document.getElementById(`file-input-${currentSlotIndex}`);
                if (el) el.click();
              }}
            >
              <input
                id={`file-input-${currentSlotIndex}`}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => onFileSelected(currentSlotIndex, e.target.files?.[0])}
              />

              {slots[currentSlotIndex] && slots[currentSlotIndex].src ? (
                <>
                  <img
                    src={slots[currentSlotIndex].src}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearSlot(currentSlotIndex);
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
                    gap: 3,
                    color: COLORS.pink,
                    padding: 4,
                  }}
                >
                  <Upload size={18} />
                  <span style={{ fontSize: 9, fontWeight: 800, color: COLORS.ink, textAlign: "center" }}>
                    + Upload Photo
                  </span>
                </div>
              )}
            </div>

            {/* Quick Card Info summary inside the card */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: COLORS.green, textTransform: "uppercase" }}>
                {isTeam ? `CARD 0${currentSlotIndex + 1} OF 04` : "SOLO BUILDER CARD"}
              </div>

              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: COLORS.ink,
                  fontFamily: "Georgia, serif",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  margin: "2px 0",
                }}
              >
                {(slots[currentSlotIndex]?.name || (isTeam ? `Member ${currentSlotIndex + 1}` : "YOUR NAME")).toUpperCase()}
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: COLORS.pink,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {builderClass(slots[currentSlotIndex]?.stack || "")}
              </div>

              {isTeam && (
                <div style={{ fontSize: 9, color: "rgba(9, 29, 20, 0.6)", marginTop: 4 }}>
                  Team: <strong style={{ color: COLORS.ink }}>{teamCode}</strong>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
