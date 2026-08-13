import { STACK_MAP } from "../constants.js";

/**
 * Maps a free-text "stack" string to a themed builder-class title.
 */
export function builderClass(stack) {
  const s = (stack || "").toLowerCase().trim();
  if (!s) return "Goa Builder 2026";

  const hits = STACK_MAP.filter((entry) => entry.keys.some((k) => s.includes(k)));
  if (hits.length >= 2) return "Full-Stack Architect";
  if (hits.length === 1) return hits[0].title;
  return "Goa Builder 2026";
}

/**
 * Deterministic pseudo-serial derived from a seed string, formatted
 * like an ID card badge number (e.g. HHG-48213).
 */
export function idSerial(seed) {
  let hash = 0;
  const str = String(seed || "HH-GOA-2026");
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return `HHG-${(hash % 90000) + 10000}`;
}

/**
 * Generates a memorable 6-character Team Code (e.g. GOA-7892)
 */
export function generateTeamCode(teamName = "") {
  const clean = teamName.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
  const prefix = clean.length >= 3 ? clean : "GOA";
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${num}`;
}

export const POLITE_ROASTS = {
  frontend: [
    "No cap, centers divs on the first try (allegedly).",
    "Converts CSS bugs into 'intentional design choices'.",
    "Has 47 Chrome tabs open, lowkey cooked 40 of them.",
    "React state updates faster than their sleep schedule.",
    "Slayed the UI design, ghosted the documentation.",
  ],
  backend: [
    "Uses console.log as a full-suite APM monitoring tool.",
    "Pushes to main on Friday 5 PM with +10k Aura.",
    "Fixes 1 bug, creates 3 unexpected feature requests.",
    "Works flawlessly on local machine (trust me bro).",
    "Living rent-free in the localhost:3000 ecosystem.",
  ],
  ai: [
    "Prompt engineer specializing in asking LLMs nicely.",
    "Calls a 3-layer linear model 'General Intelligence'.",
    "Renting braincells from ChatGPT until the demo deadline.",
    "Fine-tuning models while coarse-tuning sleep cycles.",
  ],
  systems: [
    "Rewriting the entire stack in Rust for maximum clout.",
    "Fights memory leaks with 4 cups of Goa filter coffee.",
    "Garbage collection happens manually at 4 AM.",
    "Lowkey compilation speedrun (any%).",
  ],
  design: [
    "Spent 3 hours picking border-radius for one button.",
    "Can spot a 1px misalignment from across the room.",
    "Figma file contains 1,200 unnamed frames fr fr.",
    "Highkey aesthetic overload, 0 UX flaws.",
  ],
  default: [
    "Converts caffeine directly into unmerged pull requests.",
    "Came for the Goa hackathon, staying for the coconut water.",
    "Has 0 unit tests and 100% main character aura.",
    "Powered by 3 AM epiphanies and Goa beach breeze.",
    "Writes clean code, except when demo is in 5 minutes.",
    "Lowkey locked in, highkey sleep deprived.",
  ],
};

export function genzSticker(seed = "") {
  const stickers = ["+10k AURA ⚡", "NO CAP 🧢", "LOCKED IN 🔒", "COOKING 👨‍🍳", "MAIN CHARACTER 🌟", "ABSOLUTE CINEMA 🎬"];
  let hash = 0;
  const str = String(seed || "aura");
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 37 + str.charCodeAt(i)) >>> 0;
  }
  return stickers[hash % stickers.length];
}

export function politeRoast(stack = "", seed = "") {
  const s = (stack || "").toLowerCase().trim();
  let pool = POLITE_ROASTS.default;

  if (s.includes("react") || s.includes("css") || s.includes("frontend") || s.includes("vue") || s.includes("ui")) {
    pool = POLITE_ROASTS.frontend;
  } else if (s.includes("node") || s.includes("backend") || s.includes("api") || s.includes("sql") || s.includes("postgres")) {
    pool = POLITE_ROASTS.backend;
  } else if (s.includes("ai") || s.includes("ml") || s.includes("gpt") || s.includes("llm") || s.includes("model")) {
    pool = POLITE_ROASTS.ai;
  } else if (s.includes("rust") || s.includes("c++") || s.includes("go") || s.includes("solana") || s.includes("systems")) {
    pool = POLITE_ROASTS.systems;
  } else if (s.includes("figma") || s.includes("design") || s.includes("ux") || s.includes("3d")) {
    pool = POLITE_ROASTS.design;
  }

  let hash = 0;
  const str = String(seed || stack || "goa");
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }

  return pool[hash % pool.length];
}

