import React from "react";

function PlatformSelector({ value, onChange }) {
  return (
    <select name="platform" value={value} onChange={onChange}>
      <option value="teams">Microsoft Teams</option>
      <option value="google">Google Meet</option>
      <option value="zoom">Zoom</option>
    </select>
  );
}

export default PlatformSelector;
