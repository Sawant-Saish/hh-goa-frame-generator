import React, { useState } from "react";
import { X, Copy, Check, Download, Send, ExternalLink, Sparkles, Image as ImageIcon } from "lucide-react";
import { COLORS } from "../constants.js";

export default function ShareModal({
  isOpen,
  onClose,
  mode,
  activeSlotIndex,
  slots,
  teamName,
  teamCode,
  soloName,
  onDownloadCurrent,
}) {
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const isTeam = mode === "team";
  const isCombined = activeSlotIndex === "combined";

  let memberName = "Builder";
  if (isCombined) {
    memberName = `Team ${teamName || "Squad"}`;
  } else if (isTeam) {
    const slot = slots[typeof activeSlotIndex === "number" ? activeSlotIndex : 0];
    memberName = slot?.name || `Member ${(typeof activeSlotIndex === "number" ? activeSlotIndex : 0) + 1}`;
  } else {
    memberName = soloName || "Builder";
  }

  // Pre-formatted viral X Tweet Caption
  let caption = "";
  if (isCombined) {
    const names = slots.map((s, i) => s?.name || `M0${i + 1}`).join(", ");
    caption = `Our squad is LOCKED IN for HH Goa 2026! 🚀🌴\n\nTeam: ${teamName.toUpperCase()} [ID: ${teamCode}]\nSquad: ${names}\n\nGenerated at hhgoa.com! #HHGoa2026 #FrameInGoa @HHGoa2026`;
  } else if (isTeam) {
    caption = `Just generated my official HH Goa 2026 Builder Card! 🌴\n\nBuilder: ${memberName}\nTeam: ${teamName.toUpperCase()} [Team ID: ${teamCode}]\n\nCreate yours at hhgoa.com! #HHGoa2026 #FrameInGoa @HHGoa2026`;
  } else {
    caption = `Just generated my official HH Goa 2026 Builder Badge! Ready to build in Goa. 🌴\n\nBuilder: ${memberName}\nCreate yours at hhgoa.com! #HHGoa2026 #FrameInGoa @HHGoa2026`;
  }

  // Copy PNG Image directly into Clipboard
  const handleCopyImage = async () => {
    try {
      const canvas = document.querySelector("canvas");
      if (!canvas) throw new Error("Canvas element not found");

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("Failed to create blob");

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ]);
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2500);
    } catch (err) {
      console.warn("Direct image clipboard copy not supported, downloading PNG instead:", err);
      onDownloadCurrent();
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2500);
    }
  };

  // Copy Tweet Caption Text
  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  // Launch Twitter/X Web Intent
  const handleOpenX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: "rgba(6, 40, 25, 0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#083F26",
          color: COLORS.cream,
          border: `2px solid ${COLORS.gold}`,
          borderRadius: 20,
          padding: 24,
          maxWidth: 480,
          width: "100%",
          boxShadow: "0 25px 80px rgba(0,0,0,0.7)",
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
            top: 16,
            right: 16,
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: COLORS.cream,
            width: 32,
            height: 32,
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Sparkles size={22} color={COLORS.gold} />
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: COLORS.gold }}>
            Post Card on X (Twitter)
          </h2>
        </div>

        {/* 2-Step Guidance Box */}
        <div
          style={{
            background: "rgba(239, 193, 58, 0.12)",
            border: `1px solid ${COLORS.gold}`,
            borderRadius: 10,
            padding: 12,
            marginBottom: 16,
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          <div style={{ fontWeight: 800, color: COLORS.gold, marginBottom: 4 }}>
            💡 Easy 2-Step Image Posting to X:
          </div>
          <div>1️⃣ Click <strong>"Copy Image"</strong> or <strong>"Download PNG"</strong> below.</div>
          <div>2️⃣ Click <strong>"Launch X"</strong> & press <kbd style={{ background: "rgba(0,0,0,0.4)", padding: "1px 4px", borderRadius: 4 }}>Ctrl + V</kbd> (or <kbd style={{ background: "rgba(0,0,0,0.4)", padding: "1px 4px", borderRadius: 4 }}>Cmd + V</kbd>) to paste your card!</div>
        </div>

        {/* Action Buttons for Image & Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {/* Row 1: Copy Image & Download PNG */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={handleCopyImage}
              style={{
                flex: 1,
                padding: "12px 10px",
                borderRadius: 999,
                border: "none",
                background: copiedImage ? COLORS.greenBright : COLORS.pink,
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                boxShadow: "0 4px 14px rgba(232,18,122,0.4)",
              }}
            >
              {copiedImage ? <Check size={16} /> : <ImageIcon size={16} />}
              {copiedImage ? "Image Copied!" : "Copy Card Image"}
            </button>

            <button
              type="button"
              onClick={() => onDownloadCurrent()}
              style={{
                padding: "12px 14px",
                borderRadius: 999,
                border: `1.5px solid ${COLORS.gold}`,
                background: "transparent",
                color: COLORS.gold,
                fontWeight: 800,
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Download size={16} /> Download
            </button>
          </div>

          {/* Row 2: Copy Caption Text */}
          <button
            type="button"
            onClick={handleCopyText}
            style={{
              padding: "10px 12px",
              borderRadius: 999,
              border: `1px solid rgba(255,255,255,0.2)`,
              background: "rgba(255,255,255,0.06)",
              color: COLORS.cream,
              fontWeight: 700,
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {copiedText ? <Check size={14} color={COLORS.greenBright} /> : <Copy size={14} />}
            {copiedText ? "Tweet Text Copied!" : "Copy Formatted Tweet Text"}
          </button>
        </div>

        {/* Tweet Preview Box */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, display: "block", marginBottom: 4 }}>
            TWEET CAPTION PREVIEW
          </label>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 10,
              padding: 12,
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              maxHeight: 110,
              overflowY: "auto",
              color: COLORS.cream,
            }}
          >
            {caption}
          </div>
        </div>

        {/* Big Launch X Button */}
        <button
          type="button"
          onClick={handleOpenX}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 999,
            border: "none",
            background: "#1D9BF0",
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: 15,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 6px 20px rgba(29,155,240,0.4)",
          }}
        >
          <Send size={18} /> Launch X (Twitter) App <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}
