import React from "react";
import { COLORS } from "../constants.js";
import ModeToggle from "./ModeToggle.jsx";
import PhotoSlots from "./PhotoSlots.jsx";
import DetailsForm from "./DetailsForm.jsx";
import ActionButtons from "./ActionButtons.jsx";

export default function ControlPanel({
  mode,
  onModeChange,
  slots,
  onFileSelected,
  onClearSlot,
  name,
  stack,
  onNameChange,
  onStackChange,
  ready,
  onDownload,
}) {
  return (
    <div
      style={{
        background: COLORS.cream,
        color: COLORS.ink,
        borderRadius: 20,
        padding: 24,
        width: 340,
        flexShrink: 0,
      }}
    >
      <ModeToggle mode={mode} onChange={onModeChange} />
      <PhotoSlots slots={slots} mode={mode} onFileSelected={onFileSelected} onClearSlot={onClearSlot} />
      <DetailsForm name={name} stack={stack} onNameChange={onNameChange} onStackChange={onStackChange} />
      <ActionButtons mode={mode} name={name} ready={ready} onDownload={onDownload} />
    </div>
  );
}
