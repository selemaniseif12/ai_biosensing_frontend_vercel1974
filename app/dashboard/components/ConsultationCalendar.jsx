"use client";
import { useState } from "react";

export default function ConsultationCalendar() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [meetingPlatform, setMeetingPlatform] = useState("");
  const [message, setMessage] = useState("");

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  // ⭐ Convert date + time → ISO datetime
  const buildDateTime = () => {
    return `${selectedDate}T${selectedTime}:00`;
  };

  // ⭐ Build meeting link based on platform
  const buildMeetingLink = () => {
    switch (meetingPlatform) {
      case "teams":
        return "https://teams.microsoft.com/l/meetup-join/example";
      case "zoom":
        return "https://zoom.us/j/123456789";
      case "google_meet":
        return "https://meet.google.com/abc-123";
      case "phone":
        return "tel:+10000000000";
      default:
        return "";
    }
  };

  const submitSchedule = async () => {
    if (!selectedDate || !selectedTime) {
      setMessage("Please select both a date and time.");
      return;
    }

    if (!userEmail) {
      setMessage("Please enter your email.");
      return;
    }

    if (!meetingPlatform) {
      setMessage("Please select a meeting platform.");
      return;
    }

    // ⭐ Build final values
    const scheduledTime = buildDateTime();
    const meetingLink = buildMeetingLink();

    // ⭐ Hardcoded consultation ID for now (you can replace with dynamic ID)
    const consultationId = 1;

    const url =
      `http://127.0.0.1:8000/consultations/${consultationId}/schedule` +
      `?scheduled_time=${encodeURIComponent(scheduledTime)}` +
      `&meeting_link=${encodeURIComponent(meetingLink)}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        }
      });

      const data = await response.json();
      setMessage("Consultation scheduled successfully!");
      console.log("Scheduled:", data);

    } catch (error) {
      console.error("Error scheduling consultation:", error);
      setMessage("Error scheduling consultation.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Consultation Scheduling Calendar</h2>
      <p>Select your preferred date, time, email, and meeting platform.</p>

      {/* Email */}
      <div style={{ marginTop: "20px" }}>
        <label style={{ fontWeight: "bold" }}>Your Email:</label><br />
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Enter your email"
          style={{ padding: "10px", marginTop: "10px", width: "250px" }}
        />
      </div>

      {/* Date */}
      <div style={{ marginTop: "20px" }}>
        <label style={{ fontWeight: "bold" }}>Select Date:</label><br />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ padding: "10px", marginTop: "10px" }}
        />
      </div>

      {/* Time */}
      <div style={{ marginTop: "20px" }}>
        <label style={{ fontWeight: "bold" }}>Select Time:</label><br />
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          style={{ padding: "10px", marginTop: "10px" }}
        >
          <option value="">-- Select Time --</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>

      {/* Meeting Platform */}
      <div style={{ marginTop: "20px" }}>
        <label style={{ fontWeight: "bold" }}>Meeting Platform:</label><br />
        <select
          value={meetingPlatform}
          onChange={(e) => setMeetingPlatform(e.target.value)}
          style={{ padding: "10px", marginTop: "10px" }}
        >
          <option value="">-- Select Platform --</option>
          <option value="teams">Microsoft Teams</option>
          <option value="zoom">Zoom</option>
          <option value="google_meet">Google Meet</option>
          <option value="phone">Phone Call</option>
        </select>
      </div>

      <button
        onClick={submitSchedule}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Schedule Consultation
      </button>

      {message && (
        <p style={{ marginTop: "20px", color: "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}
