import { STACK_MAP } from "../constants.js";

/**
 * Maps a free-text "stack" string to a themed builder-class title.
 * Two or more matched categories -> generalist title.
 * One match -> that category's title.
 * No matches -> generic fallback.
 */
export function builderClass(stack) {
  const s = (stack || "").toLowerCase();
  const hits = STACK_MAP.filter((entry) => entry.keys.some((k) => s.includes(k)));
  if (hits.length >= 2) return "Full-Stack Architect";
  if (hits.length === 1) return hits[0].title;
  return "Goa Builder";
}

/**
 * Deterministic pseudo-serial derived from a seed string, formatted
 * like an ID card badge number (e.g. HHG-48213).
 */
export function idSerial(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return `HHG-${(hash % 90000) + 10000}`;
}
