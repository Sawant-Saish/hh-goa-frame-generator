import { useRef, useEffect, useState, useCallback } from "react";
import { renderFrame } from "../utils/renderFrame.js";

/**
 * Owns the <canvas> ref and re-renders the frame whenever slots,
 * name, or stack change. Exposes helpers for download/share so
 * components don't touch canvas internals directly.
 */
export function useFrameRenderer({ slots, name, stack }) {
  const canvasRef = useRef(null);
  const [rendering, setRendering] = useState(false);
  const [ready, setReady] = useState(false);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setRendering(true);
    renderFrame(canvas, { slots, name, stack });
    setReady(true);
    setRendering(false);
  }, [slots, name, stack]);

  useEffect(() => {
    render();
  }, [render]);

  const download = useCallback(
    (filenameBase) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const link = document.createElement("a");
      const safe = (filenameBase || "builder").toLowerCase().replace(/\s+/g, "-");
      link.download = `hh-goa-2026-${safe}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    },
    []
  );

  return { canvasRef, rendering, ready, download };
}
