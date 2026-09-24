"use client";
import React from "react";
import MeetingCard from "./MeetingCard";

function MeetingList({ meetings }) {
  return (
    <div className="meeting-list">
      {meetings.map((m) => (
        <MeetingCard key={m.id} meeting={m} />
      ))}
    </div>
  );
}

export default MeetingList;
