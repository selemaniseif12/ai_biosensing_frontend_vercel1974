"use client";
import React, { useState } from "react";

function MeetingForm({ onCreate }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    platform: "teams",
    participants: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Meeting title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
      />
      <select
        name="platform"
        value={form.platform}
        onChange={handleChange}
      >
        <option value="teams">Microsoft Teams</option>
        <option value="google">Google Meet</option>
        <option value="zoom">Zoom</option>
      </select>
      <input
        name="participants"
        placeholder="Emails, comma-separated"
        value={form.participants}
        onChange={handleChange}
      />
      <button type="submit">Create Meeting</button>
    </form>
  );
}

export default MeetingForm;
