import { useRef, useEffect, useState, useCallback } from "react";
import { renderFrame } from "../utils/renderFrame.js";
import { FORMATS } from "../constants.js";

/**
 * Hook to handle HTML5 Canvas rendering & image export (Single + Team Grid + Batch Download)
 */
export function useFrameRenderer({
  format = FORMATS.BADGE,
  mode = "solo",
  slots = [],
  activeSlotIndex = 0,
  teamName = "",
  teamCode = "",
  soloName = "",
  soloStack = "",
}) {
  const canvasRef = useRef(null);
  const [rendering, setRendering] = useState(false);
  const [ready, setReady] = useState(false);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setRendering(true);
    
    renderFrame(canvas, {
      format,
      mode,
      slots,
      activeSlotIndex,
      teamName,
      teamCode,
      soloName,
      soloStack,
    });
    
    setReady(true);
    setRendering(false);
  }, [format, mode, slots, activeSlotIndex, teamName, teamCode, soloName, soloStack]);

  useEffect(() => {
    render();
  }, [render]);

  /**
   * Download single active canvas card or combined poster
   */
  const downloadCurrent = useCallback((customFilename) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let defaultName = "hh-goa-2026";
    if (activeSlotIndex === "combined") {
      defaultName = `hh-goa-2026-team-${teamCode || "poster"}`;
    } else if (mode === "team") {
      const activeSlot = slots[activeSlotIndex];
      const memberName = activeSlot?.name || `member-${activeSlotIndex + 1}`;
      defaultName = `hh-goa-2026-${memberName.toLowerCase().replace(/\s+/g, "-")}-${teamCode}`;
    } else {
      const name = soloName || "builder";
      defaultName = `hh-goa-2026-${name.toLowerCase().replace(/\s+/g, "-")}`;
    }

    const filename = customFilename || defaultName;
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [activeSlotIndex, mode, slots, teamCode, soloName]);

  /**
   * Batch download all 4 individual cards + 1 combined poster
   */
  const downloadAllTeamCards = useCallback(async () => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 1080;
    tempCanvas.height = 1080;

    // 1. Download each member card individually
    for (let i = 0; i < Math.min(slots.length, 4); i++) {
      renderFrame(tempCanvas, {
        format,
        mode: "team",
        slots,
        activeSlotIndex: i,
        teamName,
        teamCode,
      });

      const memberName = (slots[i]?.name || `member-${i + 1}`).toLowerCase().replace(/\s+/g, "-");
      const link = document.createElement("a");
      link.download = `hh-goa-2026-${teamCode}-card-0${i + 1}-${memberName}.png`;
      link.href = tempCanvas.toDataURL("image/png");
      link.click();

      // Short delay between triggers to allow browser download loop
      await new Promise((r) => setTimeout(r, 400));
    }

    // 2. Download combined grid poster
    renderFrame(tempCanvas, {
      format,
      mode: "team",
      slots,
      activeSlotIndex: "combined",
      teamName,
      teamCode,
    });
    const gridLink = document.createElement("a");
    gridLink.download = `hh-goa-2026-${teamCode}-FULL-SQUAD-GRID.png`;
    gridLink.href = tempCanvas.toDataURL("image/png");
    gridLink.click();
  }, [format, slots, teamName, teamCode]);

  return {
    canvasRef,
    rendering,
    ready,
    downloadCurrent,
    downloadAllTeamCards,
  };
}
