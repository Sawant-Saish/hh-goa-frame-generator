import React from "react";
import { Moon, Sun } from "lucide-react";
import { COLORS } from "../constants.js";

/**
 * Simple dark mode toggle button.
 * `isDark` and `setIsDark` are managed by the parent (ControlPanel).
 */
export default function DarkModeToggle({ isDark, setIsDark }) {
  const toggle = () => setIsDark(!isDark);
  return (
    <button
      type="button"
      onClick={toggle}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "9px 10px",
        borderRadius: 8,
        border: `1.5px solid ${isDark ? COLORS.pink : COLORS.gold}`,
        background: isDark ? COLORS.pink : COLORS.gold,
        color: isDark ? "#FFFFFF" : COLORS.ink,
        fontWeight: 800,
        fontSize: 12,
        fontFamily: "'JetBrains Mono', monospace",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      {isDark ? <Moon size={15} /> : <Sun size={15} />}
      {isDark ? "Dark" : "Light"}
    </button>
  );
}
