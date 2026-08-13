import React from "react";
import { X, Send, Download, Sparkles, Layers, ArrowLeft } from "lucide-react";
import { COLORS } from "../constants.js";

export default function PosterShowcaseModal({
  isOpen,
  onClose,
  teamName,
  teamCode,
  teamSize,
  canvasRef,
  onDownloadPoster,
  onOpenShareModal,
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9998,
        background: "rgba(3, 20, 12, 0.92)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      <div
        style={{
          maxWidth: 680,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: -48,
            right: 0,
            background: "rgba(255,255,255,0.15)",
            border: `1px solid ${COLORS.gold}`,
            color: COLORS.cream,
            padding: "6px 14px",
            borderRadius: 999,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            fontWeight: 800,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <ArrowLeft size={14} /> Back to Editor
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div
            style={{
              color: COLORS.gold,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              marginBottom: 4,
            }}
          >
            <Sparkles size={14} /> OFFICIAL HH GOA 2026 SQUAD POSTER
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: COLORS.cream, fontFamily: "Georgia, serif" }}>
            TEAM {teamName.toUpperCase()} [{teamCode}]
          </h2>
        </div>

        {/* Full-Screen HD Poster Showcase with Heavy Floating Drop Shadow */}
        <div
          style={{
            width: "100%",
            maxWidth: 520,
            aspectRatio: "1",
            borderRadius: 22,
            overflow: "hidden",
            border: `3px solid ${COLORS.gold}`,
            boxShadow: "0 40px 100px rgba(0, 0, 0, 0.9), 0 0 50px rgba(239, 193, 58, 0.3)",
            background: COLORS.greenDeep,
            marginBottom: 20,
            position: "relative",
          }}
        >
          {canvasRef && canvasRef.current ? (
            <img
              src={canvasRef.current.toDataURL("image/png")}
              alt="Combined Squad Poster"
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          ) : (
            <div style={{ padding: 40, color: COLORS.gold, textAlign: "center" }}>Rendering HD Poster...</div>
          )}
        </div>

        {/* Action Controls Bar for Poster */}
        <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 520, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenShareModal();
            }}
            style={{
              flex: 1,
              padding: "14px 16px",
              borderRadius: 999,
              border: "none",
              background: "#1D9BF0",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 6px 20px rgba(29,155,240,0.4)",
            }}
          >
            <Send size={16} /> Post Squad to X
          </button>

          <button
            type="button"
            onClick={() => onDownloadPoster()}
            style={{
              flex: 1,
              padding: "14px 16px",
              borderRadius: 999,
              border: `2px solid ${COLORS.gold}`,
              background: COLORS.pink,
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 6px 20px rgba(232,18,122,0.4)",
            }}
          >
            <Download size={16} /> Download Poster
          </button>
        </div>
      </div>
    </div>
  );
}
