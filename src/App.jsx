import React, { useState, useCallback, useEffect } from "react";
import { COLORS, MAX_TEAM_SLOTS } from "./constants.js";
import { loadImage } from "./utils/canvasDraw.js";
import { detectFaces, preloadFaceModel } from "./utils/faceDetection.js";
import { useFrameRenderer } from "./hooks/useFrameRenderer.js";
import ControlPanel from "./components/ControlPanel.jsx";
import PreviewCanvas from "./components/PreviewCanvas.jsx";

const NO_FACE_MESSAGE = "No human face detected in that photo. Upload a clear photo of a face to continue.";
const READ_ERROR_MESSAGE = "Couldn't read that image. Try a different file.";

function resizeToLength(arr, length, fill = null) {
  const next = arr.slice(0, length);
  while (next.length < length) next.push(fill);
  return next;
}

export default function App() {
  const [mode, setMode] = useState("solo"); // "solo" | "team"
  const [slots, setSlots] = useState([null]);
  const [verifying, setVerifying] = useState([false]);
  const [errors, setErrors] = useState([null]);
  const [name, setName] = useState("");
  const [stack, setStack] = useState("");

  const maxSlots = mode === "team" ? MAX_TEAM_SLOTS : 1;

  // Warm up the face-detection model in the background so the first
  // upload doesn't stall on a cold model load.
  useEffect(() => {
    preloadFaceModel();
  }, []);

  // Resize the per-slot arrays to match the active mode, preserving
  // any photos/state already in the kept slots.
  useEffect(() => {
    setSlots((prev) => resizeToLength(prev, maxSlots));
    setVerifying((prev) => resizeToLength(prev, maxSlots, false));
    setErrors((prev) => resizeToLength(prev, maxSlots));
  }, [maxSlots]);

  const setAt = (setter) => (index, value) =>
    setter((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

  const handleFileSelected = useCallback(async (index, file) => {
    if (!file) return;

    setAt(setErrors)(index, null);
    setAt(setVerifying)(index, true);

    let src;
    try {
      src = URL.createObjectURL(file);
      const img = await loadImage(src);
      const faces = await detectFaces(img);

      if (faces.length === 0) {
        URL.revokeObjectURL(src);
        setAt(setErrors)(index, NO_FACE_MESSAGE);
        return;
      }

      // Face-only, auto-cropped: store the top face so renderFrame
      // can crop/center on it instead of the image's raw center.
      setAt(setSlots)(index, { src, img, face: faces[0] });
    } catch (err) {
      if (src) URL.revokeObjectURL(src);
      setAt(setErrors)(index, READ_ERROR_MESSAGE);
    } finally {
      setAt(setVerifying)(index, false);
    }
  }, []);

  const handleClearSlot = useCallback((index) => {
    setAt(setSlots)(index, null);
    setAt(setErrors)(index, null);
  }, []);

  const { canvasRef, rendering, ready, download } = useFrameRenderer({ slots, name, stack });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${COLORS.green} 0%, ${COLORS.greenDeep} 100%)`,
        color: COLORS.cream,
        padding: "40px 24px 60px",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div
        style={{
          color: COLORS.gold,
          fontSize: 13,
          letterSpacing: "0.14em",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        BUILD THIS · TASK #1
      </div>
      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          textAlign: "center",
          margin: "8px 0 6px",
          color: COLORS.cream,
        }}
      >
        HH Goa Frame Generator
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "rgba(251,243,222,0.7)",
          fontSize: 14,
          maxWidth: 520,
          margin: "0 auto 32px",
          lineHeight: 1.5,
        }}
      >
        Upload a photo, it auto-fits the frame — no cropping. Add your name and stack, download, and share.
      </p>

      <div
        style={{
          display: "flex",
          gap: 28,
          maxWidth: 980,
          margin: "0 auto",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <ControlPanel
          mode={mode}
          onModeChange={setMode}
          slots={slots}
          verifying={verifying}
          errors={errors}
          onFileSelected={handleFileSelected}
          onClearSlot={handleClearSlot}
          name={name}
          stack={stack}
          onNameChange={setName}
          onStackChange={setStack}
          ready={ready}
          onDownload={download}
        />
        <PreviewCanvas canvasRef={canvasRef} rendering={rendering} />
      </div>
    </div>
  );
}
