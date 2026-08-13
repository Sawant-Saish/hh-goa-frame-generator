import React from "react";
import { COLORS } from "../constants.js";
import { builderClass } from "../utils/identity.js";

const fieldLabelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.08em",
  color: COLORS.green,
  marginBottom: 6,
  marginTop: 12,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "2px solid rgba(15,42,27,0.15)",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 14,
  color: COLORS.ink,
  background: "#fff",
};

export default function DetailsForm({ name, stack, onNameChange, onStackChange }) {
  return (
    <>
      <label style={fieldLabelStyle}>Name</label>
      <input
        className="hhg-input"
        style={inputStyle}
        placeholder="e.g. Saish"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        maxLength={28}
      />

      <label style={fieldLabelStyle}>Stack</label>
      <input
        className="hhg-input"
        style={inputStyle}
        placeholder="e.g. React, Node, ML"
        value={stack}
        onChange={(e) => onStackChange(e.target.value)}
        maxLength={60}
      />

      <div style={{ marginTop: 14, fontSize: 13, color: "rgba(15,42,27,0.7)" }}>
        Builder class: <strong style={{ color: COLORS.pink }}>{builderClass(stack)}</strong>
      </div>
    </>
  );
}
