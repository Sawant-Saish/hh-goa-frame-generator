/**
 * Loads a File/Blob URL into an HTMLImageElement.
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Draws `img` into the target rect using "object-fit: cover" behavior with
 * optional zoom scale and pan offset (offsetX, offsetY in percentage -50 to 50).
 */
export function drawCover(ctx, img, x, y, w, h, zoom = 1, offsetX = 0, offsetY = 0) {
  if (!img) return;
  
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  const baseScale = Math.max(w / img.width, h / img.height);
  const scale = baseScale * Math.max(1, zoom);
  
  const sw = w / scale;
  const sh = h / scale;
  
  // Calculate center with pan offsets
  const maxPanX = (img.width - sw) / 2;
  const maxPanY = (img.height - sh) / 2;
  
  const panXVal = (offsetX / 50) * maxPanX;
  const panYVal = (offsetY / 50) * maxPanY;
  
  const sx = Math.max(0, Math.min(img.width - sw, (img.width - sw) / 2 + panXVal));
  const sy = Math.max(0, Math.min(img.height - sh, (img.height - sh) / 2 + panYVal));

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  ctx.restore();
}

/**
 * Draws one L-shaped corner bracket (viewfinder/terminal motif) at
 * (x, y), rotated by `rot` radians.
 */
export function drawBracket(ctx, x, y, size, rot, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, size);
  ctx.lineTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

import QRCode from "qrcode";

/**
 * Generates a real, scannable 2D QR Code matrix onto the canvas context.
 */
export function drawQRCodeStamp(ctx, x, y, size, qrText, mainColor = "#091D14", bgColor = "#FBF3DE") {
  ctx.save();
  // Outer frame & background
  ctx.fillStyle = bgColor;
  ctx.fillRect(x, y, size, size);
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, size, size);

  try {
    const textToEncode = qrText || "https://hhgoa.com";
    const qr = QRCode.create(textToEncode, { errorCorrectionLevel: "M" });
    const numCells = qr.modules.size;
    const padding = 2; // quiet zone in cells
    const totalGrid = numCells + padding * 2;
    const cellSize = size / totalGrid;

    ctx.fillStyle = mainColor;
    for (let row = 0; row < numCells; row++) {
      for (let col = 0; col < numCells; col++) {
        if (qr.modules.get(row, col)) {
          ctx.fillRect(
            x + (col + padding) * cellSize,
            y + (row + padding) * cellSize,
            cellSize + 0.3, // fill subpixel gaps cleanly
            cellSize + 0.3
          );
        }
      }
    }
  } catch (err) {
    console.error("Failed to generate QR Code stamp:", err);
  }

  ctx.restore();
}

/**
 * Lays out N photo slots into a grid rect: 1 slot fills it, 2 slots
 * sit side by side, 3-4 slots form a 2x2 grid.
 */
export function gridLayout(rect, count, gap = 8) {
  if (count <= 1) return [{ x: rect.x, y: rect.y, w: rect.w, h: rect.h }];
  const cols = count <= 2 ? count : 2;
  const rows = Math.ceil(count / cols);
  const cw = (rect.w - gap * (cols - 1)) / cols;
  const ch = (rect.h - gap * (rows - 1)) / rows;
  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      x: rect.x + col * (cw + gap),
      y: rect.y + row * (ch + gap),
      w: cw,
      h: ch,
    };
  });
}

