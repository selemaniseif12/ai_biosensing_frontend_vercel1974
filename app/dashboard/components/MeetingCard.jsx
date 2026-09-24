"use client";
import React from "react";

function MeetingCard({ meeting }) {
  const {
    topic,
    scheduled_time,
    meeting_link,
    platform,
    participants
  } = meeting;

  return (
    <div className="meeting-card">
      <h3>{topic || "Consultation"}</h3>

      <p>{scheduled_time}</p>

      {platform && <p>Platform: {platform}</p>}
      {participants && <p>Participants: {participants}</p>}

      {meeting_link && (
        <a href={meeting_link} target="_blank" rel="noopener noreferrer">
          <button>Join Meeting</button>
        </a>
      )}
    </div>
  );
}

export default MeetingCard;
