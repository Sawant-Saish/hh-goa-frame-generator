import { CANVAS_SIZE, BORDER, STRIP_H, COLORS } from "../constants.js";
import { drawCover, drawFaceCover, drawBracket, gridLayout } from "./canvasDraw.js";
import { builderClass, idSerial } from "./identity.js";

/**
 * Renders the complete HH Goa 2026 frame onto `canvas`, given the
 * current slot images and card details. Pure function of its inputs
 * (aside from mutating the canvas) so it's easy to call from a hook
 * or a test.
 */
export function renderFrame(canvas, { slots, name, stack }) {
  const ctx = canvas.getContext("2d");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;

  ctx.fillStyle = COLORS.greenDeep;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const photoArea = {
    x: BORDER,
    y: BORDER,
    w: CANVAS_SIZE - BORDER * 2,
    h: CANVAS_SIZE - BORDER * 2 - STRIP_H,
  };

  const validSlots = slots.filter(Boolean);
  drawPhotos(ctx, photoArea, validSlots);
  drawDuotoneOverlay(ctx, photoArea);
  drawOuterBorder(ctx);
  drawCornerBrackets(ctx, photoArea);
  drawRibbon(ctx, photoArea);
  drawInfoStrip(ctx, photoArea, { name, stack, teamSize: validSlots.length });

  return { name, stack, teamSize: validSlots.length };
}

function drawPhotos(ctx, area, validSlots) {
  if (validSlots.length === 0) {
    ctx.fillStyle = "#0f4a2c";
    ctx.fillRect(area.x, area.y, area.w, area.h);
    ctx.fillStyle = "rgba(251,243,222,0.35)";
    ctx.font = "600 34px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("UPLOAD A PHOTO", CANVAS_SIZE / 2, area.y + area.h / 2);
    return;
  }
  const rects = gridLayout(area, validSlots.length);
  validSlots.forEach((slot, i) => {
    const r = rects[i];
    if (slot.face) {
      drawFaceCover(ctx, slot.img, slot.face, r.x, r.y, r.w, r.h);
    } else {
      // Shouldn't happen in normal flow (a slot only gets set after a
      // face is confirmed), but fall back to a plain center-crop
      // rather than failing the render.
      drawCover(ctx, slot.img, r.x, r.y, r.w, r.h);
    }
  });
}

function drawDuotoneOverlay(ctx, area) {
  ctx.fillStyle = "rgba(8,63,38,0.16)";
  ctx.fillRect(area.x, area.y, area.w, area.h);
}

function drawOuterBorder(ctx) {
  ctx.strokeStyle = COLORS.pink;
  ctx.lineWidth = 3;
  ctx.setLineDash([2, 10]);
  ctx.strokeRect(BORDER / 2, BORDER / 2, CANVAS_SIZE - BORDER, CANVAS_SIZE - BORDER);
  ctx.setLineDash([]);
}

function drawCornerBrackets(ctx, area) {
  const bs = 46;
  drawBracket(ctx, area.x - 6, area.y - 6, bs, 0, COLORS.gold);
  drawBracket(ctx, area.x + area.w + 6, area.y - 6, bs, Math.PI / 2, COLORS.gold);
  drawBracket(ctx, area.x + area.w + 6, area.y + area.h + 6, bs, Math.PI, COLORS.gold);
  drawBracket(ctx, area.x - 6, area.y + area.h + 6, bs, -Math.PI / 2, COLORS.gold);
}

function drawRibbon(ctx, area) {
  ctx.fillStyle = COLORS.gold;
  ctx.font = "700 22px 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText("HH GOA · 2026", area.x + 4, area.y - 14);

  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(251,243,222,0.55)";
  ctx.font = "600 20px 'JetBrains Mono', monospace";
  ctx.fillText("#FrameInGoa", area.x + area.w - 4, area.y - 14);
}

function drawInfoStrip(ctx, area, { name, stack, teamSize }) {
  const stripY = area.y + area.h + 22;

  ctx.fillStyle = COLORS.cream;
  ctx.fillRect(area.x, stripY, area.w, STRIP_H - 22);
  ctx.fillStyle = COLORS.pink;
  ctx.fillRect(area.x, stripY, 6, STRIP_H - 22);

  const displayName = (name || "").trim() || "YOUR NAME";
  const cls = builderClass(stack || "");
  const serial = idSerial(displayName + (stack || ""));

  ctx.textAlign = "left";
  ctx.fillStyle = COLORS.ink;
  ctx.font = "700 54px Georgia, 'Playfair Display', serif";
  ctx.fillText(displayName.toUpperCase(), area.x + 34, stripY + 68);

  ctx.fillStyle = COLORS.green;
  ctx.font = "700 26px 'JetBrains Mono', monospace";
  ctx.fillText(cls.toUpperCase(), area.x + 34, stripY + 108);

  ctx.fillStyle = "rgba(15,42,27,0.6)";
  ctx.font = "500 20px 'JetBrains Mono', monospace";
  ctx.fillText((stack || "").trim().slice(0, 60) || "your stack here", area.x + 34, stripY + 140);

  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(15,42,27,0.45)";
  ctx.font = "600 20px 'JetBrains Mono', monospace";
  ctx.fillText(serial, area.x + area.w - 24, stripY + 68);
  ctx.fillText(teamSize > 1 ? `TEAM x${teamSize}` : "SOLO", area.x + area.w - 24, stripY + 96);
}
