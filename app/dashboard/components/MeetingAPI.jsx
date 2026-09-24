"use client";
// MeetingsAPI.jsx

/* --------------------------------------------------
   GET MEETINGS (your original function, unchanged)
--------------------------------------------------- */
export async function getMeetings() {
  const res = await fetch("/api/meetings");

  if (!res.ok) {
    console.error("Backend returned error:", res.status);
    return [];
  }

  const data = await res.json();

  return data.map((m) => ({
    id: m.id || m.consultation_id || crypto.randomUUID(),
    date: m.date || "",
    time: m.time || "",
    platform: m.platform || "N/A",
    link: m.meeting_link || "",
    title: "Consultation Meeting",
  }));
}

/* --------------------------------------------------
   CREATE MEETING (added to fix Next.js build error)
--------------------------------------------------- */
export async function createMeeting(payload) {
  try {
    const res = await fetch("/api/meetings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Failed to create meeting:", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("createMeeting error:", err);
    return null;
  }
}

/* --------------------------------------------------
   ASSIGN TEAM (optional API helper)
--------------------------------------------------- */
export async function assignTeam(meetingId, teamId) {
  try {
    const res = await fetch(`/api/meetings/${meetingId}/assign-team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId }),
    });

    if (!res.ok) {
      console.error("Failed to assign team:", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("assignTeam error:", err);
    return null;
  }
}

/* --------------------------------------------------
   SEND EMAIL (optional API helper)
--------------------------------------------------- */
export async function sendEmail(recipients, subject, message) {
  try {
    const res = await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipients,
        subject,
        message,
      }),
    });

    if (!res.ok) {
      console.error("Failed to send email:", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("sendEmail error:", err);
    return null;
  }
}

