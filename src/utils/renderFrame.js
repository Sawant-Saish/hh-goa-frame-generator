import { CANVAS_SIZE, BORDER, STRIP_H, COLORS, FORMATS } from "../constants.js";
import { drawCover, drawBracket, gridLayout, drawQRCodeStamp } from "./canvasDraw.js";
import { builderClass, idSerial, politeRoast, genzSticker } from "./identity.js";

/**
 * Renders the official HH Goa 2026 Builder Badge onto `canvas`.
 */
export function renderFrame(canvas, {
  format = FORMATS.BADGE,
  mode = "solo",
  slots = [],
  activeSlotIndex = 0,
  teamName = "SOLO BUILDER",
  teamCode = "GOA-2026",
  soloName = "",
  soloStack = "",
}) {
  const ctx = canvas.getContext("2d");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;

  // Background
  ctx.fillStyle = COLORS.greenDeep;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // If user selected combined view in team mode
  if (activeSlotIndex === "combined" && mode === "team") {
    renderCombinedTeamPoster(ctx, { slots, teamName, teamCode });
    return;
  }

  // Otherwise render active single member slot (or solo)
  const currentSlotIndex = typeof activeSlotIndex === "number" ? activeSlotIndex : 0;
  const currentSlot = slots[currentSlotIndex] || null;
  const displayName = mode === "team" 
    ? (currentSlot?.name || `MEMBER ${currentSlotIndex + 1}`)
    : (soloName || "YOUR NAME");
  const displayStack = mode === "team"
    ? (currentSlot?.stack || "FULLSTACK BUILDER")
    : (soloStack || "React, Node, Web3");

  renderBuilderBadge(ctx, { slot: currentSlot, name: displayName, stack: displayStack, teamName, teamCode, mode, memberIndex: currentSlotIndex });
}

/**
 * Official Builder ID Card Badge with photo, name, title, scannable QR, and polite roast.
 */
function renderBuilderBadge(ctx, { slot, name, stack, teamName, teamCode, mode, memberIndex }) {
  const photoArea = {
    x: BORDER,
    y: BORDER + 64,
    w: CANVAS_SIZE - BORDER * 2,
    h: CANVAS_SIZE - BORDER * 2 - STRIP_H - 40,
  };

  // Top Header Banner
  ctx.fillStyle = COLORS.gold;
  ctx.fillRect(BORDER, BORDER, CANVAS_SIZE - BORDER * 2, 60);

  ctx.fillStyle = COLORS.ink;
  ctx.font = "800 26px 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText("🌴 HH GOA 2026 · BUILDER BADGE", BORDER + 20, BORDER + 40);

  ctx.textAlign = "right";
  ctx.font = "700 20px 'JetBrains Mono', monospace";
  ctx.fillText(mode === "team" ? `TEAM: ${teamCode}` : "#FrameInGoa", CANVAS_SIZE - BORDER - 20, BORDER + 40);

  // Photo
  if (slot && slot.img) {
    drawCover(ctx, slot.img, photoArea.x, photoArea.y, photoArea.w, photoArea.h, slot.zoom || 1, slot.offsetX || 0, slot.offsetY || 0);
  } else {
    drawPlaceholder(ctx, photoArea, "UPLOAD BUILDER PHOTO");
  }

  // Dark overlay frame border around photo
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 2;
  ctx.strokeRect(photoArea.x, photoArea.y, photoArea.w, photoArea.h);

  // Funky Gen-Z Sticker Badge on Photo Top Left
  const sticker = genzSticker(`${name}-${teamCode}-${memberIndex}`);
  ctx.save();
  ctx.fillStyle = COLORS.pink;
  ctx.fillRect(photoArea.x + 16, photoArea.y + 16, 185, 38);
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 2;
  ctx.strokeRect(photoArea.x + 16, photoArea.y + 16, 185, 38);
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 15px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(sticker, photoArea.x + 16 + 92, photoArea.y + 41);
  ctx.restore();

  // Corner Brackets
  const bs = 42;
  drawBracket(ctx, photoArea.x - 4, photoArea.y - 4, bs, 0, COLORS.gold);
  drawBracket(ctx, photoArea.x + photoArea.w + 4, photoArea.y - 4, bs, Math.PI / 2, COLORS.gold);
  drawBracket(ctx, photoArea.x + photoArea.w + 4, photoArea.y + photoArea.h + 4, bs, Math.PI, COLORS.gold);
  drawBracket(ctx, photoArea.x - 4, photoArea.y + photoArea.h + 4, bs, -Math.PI / 2, COLORS.gold);

  // Bottom Info Strip Card
  const stripY = photoArea.y + photoArea.h + 16;
  const stripH = CANVAS_SIZE - BORDER - stripY;

  ctx.fillStyle = COLORS.cream;
  ctx.fillRect(BORDER, stripY, CANVAS_SIZE - BORDER * 2, stripH);

  // Pink Accent Ribbon
  ctx.fillStyle = COLORS.pink;
  ctx.fillRect(BORDER, stripY, 10, stripH);

  // Badge Name & Title & Polite Roast
  const displayName = (name || "").trim() || "BUILDER";
  const bTitle = builderClass(stack);
  const roast = politeRoast(stack, `${displayName}-${teamCode}-${memberIndex}`);
  const serial = idSerial(`${displayName}-${teamCode}-${memberIndex}`);

  ctx.textAlign = "left";
  ctx.fillStyle = COLORS.ink;
  ctx.font = "800 46px Georgia, 'Playfair Display', serif";
  ctx.fillText(displayName.toUpperCase().slice(0, 20), BORDER + 34, stripY + 52);

  // Builder Class Title
  ctx.fillStyle = COLORS.pink;
  ctx.font = "700 22px 'JetBrains Mono', monospace";
  ctx.fillText(bTitle.toUpperCase(), BORDER + 34, stripY + 86);

  // Minimal Polite Roast / Humorous Tagline
  ctx.fillStyle = "rgba(9, 29, 20, 0.78)";
  ctx.font = "italic 600 16px 'JetBrains Mono', monospace";
  ctx.fillText(`“${roast}”`, BORDER + 34, stripY + 116);

  // Stack/Role
  if (stack && stack.trim()) {
    ctx.fillStyle = COLORS.green;
    ctx.font = "600 17px 'JetBrains Mono', monospace";
    ctx.fillText(`STACK: ${stack.trim().slice(0, 36)}`, BORDER + 34, stripY + 144);
  } else if (mode === "team" && teamName) {
    ctx.fillStyle = COLORS.green;
    ctx.font = "600 17px 'JetBrains Mono', monospace";
    ctx.fillText(`TEAM: ${teamName.toUpperCase().slice(0, 28)}`, BORDER + 34, stripY + 144);
  }

  // Serial & Slot tag on Right (Clean alignment to the left of the QR Code)
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(9, 29, 20, 0.65)";
  ctx.font = "700 20px 'JetBrains Mono', monospace";
  ctx.fillText(serial, CANVAS_SIZE - BORDER - 145, stripY + 52);

  ctx.font = "600 16px 'JetBrains Mono', monospace";
  ctx.fillText(mode === "team" ? `TEAM: ${teamCode}` : "#FrameInGoa", CANVAS_SIZE - BORDER - 145, stripY + 80);

  // QR Code Stamp (Encodes scannable web URL with full builder details & roast!)
  const qrSize = 104;
  const qrUrl = `https://hhgoa.com/?team=${encodeURIComponent(teamCode)}&name=${encodeURIComponent(displayName)}&stack=${encodeURIComponent(stack)}&serial=${encodeURIComponent(serial)}`;
  drawQRCodeStamp(ctx, CANVAS_SIZE - BORDER - qrSize - 16, stripY + 18, qrSize, qrUrl, COLORS.ink, COLORS.goldLight);
}

/**
 * COMBINED TEAM POSTER (4-in-1 Grid Poster for Teams)
 */
function renderCombinedTeamPoster(ctx, { slots, teamName, teamCode }) {
  // Top Header Banner
  ctx.fillStyle = COLORS.gold;
  ctx.fillRect(BORDER, BORDER, CANVAS_SIZE - BORDER * 2, 70);

  ctx.fillStyle = COLORS.ink;
  ctx.font = "800 28px 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText(`🌴 TEAM ${teamName.toUpperCase()}`, BORDER + 24, BORDER + 44);

  ctx.textAlign = "right";
  ctx.font = "700 22px 'JetBrains Mono', monospace";
  ctx.fillText(`ID: ${teamCode} · HH GOA 2026`, CANVAS_SIZE - BORDER - 24, BORDER + 44);

  // 2x2 Grid for 4 Team Cards
  const gridArea = {
    x: BORDER,
    y: BORDER + 90,
    w: CANVAS_SIZE - BORDER * 2,
    h: CANVAS_SIZE - BORDER * 2 - 170,
  };

  const rects = gridLayout(gridArea, 4, 16);

  slots.forEach((slot, i) => {
    const rect = rects[i];
    
    // Card backdrop
    ctx.fillStyle = COLORS.darkGlass;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.strokeStyle = COLORS.gold;
    ctx.lineWidth = 2;
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);

    const mName = slot?.name || `MEMBER ${i + 1}`;
    const mStack = slot?.stack || "BUILDER";
    const roast = politeRoast(mStack, `${mName}-${teamCode}-${i}`);
    const photoH = rect.h - 90;

    // Draw member photo
    if (slot && slot.img) {
      drawCover(ctx, slot.img, rect.x, rect.y, rect.w, photoH, slot.zoom || 1, slot.offsetX || 0, slot.offsetY || 0);
    } else {
      ctx.fillStyle = "rgba(11,110,62,0.15)";
      ctx.fillRect(rect.x, rect.y, rect.w, photoH);
      ctx.fillStyle = "rgba(251,243,222,0.4)";
      ctx.font = "600 20px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(`+ ADD MEMBER ${i + 1}`, rect.x + rect.w / 2, rect.y + photoH / 2);
    }

    // Member Info Box
    ctx.fillStyle = COLORS.cream;
    ctx.fillRect(rect.x, rect.y + photoH, rect.w, 90);
    ctx.fillStyle = COLORS.pink;
    ctx.fillRect(rect.x, rect.y + photoH, 6, 90);

    ctx.textAlign = "left";
    ctx.fillStyle = COLORS.ink;
    ctx.font = "700 22px Georgia, 'Playfair Display', serif";
    ctx.fillText(mName.toUpperCase().slice(0, 15), rect.x + 14, rect.y + photoH + 28);

    ctx.fillStyle = COLORS.pink;
    ctx.font = "600 15px 'JetBrains Mono', monospace";
    ctx.fillText(builderClass(mStack).toUpperCase().slice(0, 20), rect.x + 14, rect.y + photoH + 50);

    ctx.fillStyle = "rgba(9, 29, 20, 0.75)";
    ctx.font = "italic 500 12px 'JetBrains Mono', monospace";
    ctx.fillText(`“${roast.slice(0, 32)}...”`, rect.x + 14, rect.y + photoH + 72);

    // Corner bracket accent
    drawBracket(ctx, rect.x, rect.y, 20, 0, COLORS.gold);
  });

  // Footer Banner with Scannable Team QR Code
  const footY = CANVAS_SIZE - BORDER - 60;
  ctx.fillStyle = COLORS.darkGlass;
  ctx.fillRect(BORDER, footY, CANVAS_SIZE - BORDER * 2, 60);
  
  ctx.fillStyle = COLORS.cream;
  ctx.font = "700 20px 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText("HH GOA 2026 · SQUAD BADGE PACK · #FrameInGoa", BORDER + 20, footY + 38);

  const teamQrUrl = `https://hhgoa.com/?team=${encodeURIComponent(teamCode)}&name=${encodeURIComponent(teamName)}`;
  drawQRCodeStamp(ctx, CANVAS_SIZE - BORDER - 54, footY + 5, 50, teamQrUrl, COLORS.gold, COLORS.greenDeep);
}

function drawPlaceholder(ctx, area, label) {
  ctx.fillStyle = "rgba(11,110,62,0.2)";
  ctx.fillRect(area.x, area.y, area.w, area.h);
  ctx.fillStyle = COLORS.gold;
  ctx.font = "700 32px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(`+ ${label}`, area.x + area.w / 2, area.y + area.h / 2);
}
