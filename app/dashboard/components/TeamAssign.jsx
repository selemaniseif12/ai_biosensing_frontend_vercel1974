import React from "react";

function TeamAssign({ teams, value, onChange }) {
  return (
    <select name="team" value={value} onChange={onChange}>
      <option value="">Select Team</option>
      {teams.map((t) => (
        <option key={t.id} value={t.id}>
          {t.name}
        </option>
      ))}
    </select>
  );
}

export default TeamAssign;
