/**
 * Loads a File/Blob URL into an HTMLImageElement.
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Draws `img` into the target rect using "object-fit: cover" behavior:
 * scales to fill the rect and center-crops the overflow. This is what
 * lets any uploaded photo fit the frame with no manual cropping step.
 */
export function drawCover(ctx, img, x, y, w, h) {
  const scale = Math.max(w / img.width, h / img.height);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (img.width - sw) / 2;
  const sy = (img.height - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

/**
 * Draws one L-shaped corner bracket (viewfinder/terminal motif) at
 * (x, y), rotated by `rot` radians so the same function covers all
 * four corners.
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
