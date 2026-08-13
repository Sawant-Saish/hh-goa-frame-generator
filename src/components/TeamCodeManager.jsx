import React, { useState } from "react";
import { Users, Copy, Check, RefreshCw, Link as LinkIcon, ChevronDown, ChevronUp } from "lucide-react";
import { COLORS } from "../constants.js";
import { generateTeamCode } from "../utils/identity.js";

export default function TeamCodeManager({
  teamName,
  onTeamNameChange,
  teamCode,
  onTeamCodeChange,
  teamSize = 3,
  onTeamSizeChange,
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNewTeamCode = (e) => {
    e.stopPropagation();
    const newCode = generateTeamCode(teamName);
    onTeamCodeChange(newCode);
  };

  const getShareableTeamUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("team", teamCode);
    if (teamName) url.searchParams.set("name", teamName);
    return url.toString();
  };

  const handleCopyLink = async (e) => {
    e.stopPropagation();
    try {
      const shareUrl = getShareableTeamUrl();
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div
      style={{
        background: "rgba(11, 110, 62, 0.12)",
        borderRadius: 10,
        padding: "8px 12px",
        marginBottom: 12,
        border: "1px solid rgba(11, 110, 62, 0.25)",
      }}
    >
      {/* Compact Summary Header Bar */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Users size={14} color={COLORS.green} />
          <span style={{ fontSize: 11, fontWeight: 800, color: "inherit" }}>
            TEAM: {teamName.toUpperCase().slice(0, 12)}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              background: COLORS.pink,
              color: "#fff",
              padding: "1px 6px",
              borderRadius: 4,
            }}
          >
            {teamCode} ({teamSize} Members)
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            type="button"
            onClick={handleCopyLink}
            title="Copy shareable Team Invite Link"
            style={{
              padding: "4px 8px",
              borderRadius: 6,
              border: "none",
              background: copied ? COLORS.green : COLORS.greenDeep,
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {copied ? <Check size={12} /> : <LinkIcon size={12} />}
            {copied ? "Copied!" : "Copy Link"}
          </button>

          {expanded ? <ChevronUp size={16} color="inherit" /> : <ChevronDown size={16} color="inherit" />}
        </div>
      </div>

      {/* Expanded Team Config Form */}
      {expanded && (
        <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px dashed rgba(9, 29, 20, 0.2)" }}>
          {/* Dynamic Team Size Selector */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", fontSize: 10, fontWeight: 800, opacity: 0.9, marginBottom: 4 }}>
              SELECT TEAM SIZE ({teamSize} BUILDERS MAX)
            </label>
            <div style={{ display: "flex", gap: 4 }}>
              {[1, 2, 3].map((num) => {
                const isActive = teamSize === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => onTeamSizeChange && onTeamSizeChange(num)}
                    style={{
                      flex: 1,
                      padding: "6px 4px",
                      borderRadius: 6,
                      border: isActive ? `1.5px solid ${COLORS.gold}` : "1px solid rgba(0,0,0,0.15)",
                      background: isActive ? COLORS.pink : "rgba(255,255,255,0.1)",
                      color: isActive ? "#FFFFFF" : "inherit",
                      fontWeight: 800,
                      fontSize: 11,
                      fontFamily: "'JetBrains Mono', monospace",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {num} {num === 1 ? "Member" : "Members"}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 9, fontWeight: 700, opacity: 0.8, marginBottom: 2 }}>
                TEAM NAME
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => onTeamNameChange(e.target.value)}
                placeholder="Team Name"
                maxLength={20}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid rgba(9,29,20,0.2)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: COLORS.ink,
                  background: "#fff",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 9, fontWeight: 700, opacity: 0.8, marginBottom: 2 }}>
                TEAM CODE
              </label>
              <div style={{ display: "flex", gap: 4 }}>
                <input
                  type="text"
                  value={teamCode}
                  onChange={(e) => onTeamCodeChange(e.target.value.toUpperCase())}
                  placeholder="GOA-7892"
                  maxLength={10}
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    borderRadius: 6,
                    border: "1px solid rgba(9,29,20,0.2)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    fontWeight: 800,
                    color: COLORS.pink,
                    background: "#fff",
                  }}
                />
                <button
                  type="button"
                  onClick={handleNewTeamCode}
                  title="Generate new Team Code"
                  style={{
                    padding: "6px 8px",
                    borderRadius: 6,
                    border: "none",
                    background: COLORS.green,
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RefreshCw size={12} />
                </button>
              </div>
            </div>
          </div>

          <p style={{ fontSize: 9, opacity: 0.8, margin: 0 }}>
            Send link to teammates so everyone uses the same squad Team ID!
          </p>
        </div>
      )}
    </div>
  );
}
