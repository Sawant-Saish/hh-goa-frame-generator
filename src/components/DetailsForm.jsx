import React from "react";
import { COLORS } from "../constants.js";
import { builderClass } from "../utils/identity.js";

const fieldLabelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 800,
  color: "inherit",
  opacity: 0.95,
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: 8,
  border: `2px solid ${COLORS.green}`,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 13,
  fontWeight: 700,
  color: "#091D14",
  background: "#FFFFFF",
  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
};

export default function DetailsForm({
  mode,
  activeSlotIndex,
  slots,
  soloName,
  soloStack,
  onMemberNameChange,
  onMemberStackChange,
  onSoloNameChange,
  onSoloStackChange,
}) {
  const isTeam = mode === "team";
  const currentSlotIndex = typeof activeSlotIndex === "number" ? activeSlotIndex : 0;
  const currentSlot = slots[currentSlotIndex] || {};

  const nameValue = isTeam ? currentSlot.name || "" : soloName;
  const stackValue = isTeam ? currentSlot.stack || "" : soloStack;

  const handleNameChange = (val) => {
    if (isTeam) {
      onMemberNameChange(currentSlotIndex, val);
    } else {
      onSoloNameChange(val);
    }
  };

  const handleStackChange = (val) => {
    if (isTeam) {
      onMemberStackChange(currentSlotIndex, val);
    } else {
      onSoloStackChange(val);
    }
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div>
          <label style={fieldLabelStyle}>
            {isTeam ? `M0${currentSlotIndex + 1} Name` : "Builder Name"}
          </label>
          <input
            className="hhg-input"
            style={inputStyle}
            placeholder={isTeam ? `Member ${currentSlotIndex + 1}` : "e.g. Saish"}
            value={nameValue}
            onChange={(e) => handleNameChange(e.target.value)}
            maxLength={22}
          />
        </div>

        <div>
          <label style={fieldLabelStyle}>Tech Stack / Role</label>
          <input
            className="hhg-input"
            style={inputStyle}
            placeholder="React, Node, ML"
            value={stackValue}
            onChange={(e) => handleStackChange(e.target.value)}
            maxLength={40}
          />
        </div>
      </div>
    </div>
  );
}
