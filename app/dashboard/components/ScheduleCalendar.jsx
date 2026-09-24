import React from "react";

function ScheduleCalendar({ meetings }) {
  // Group meetings by date
  const grouped = meetings.reduce((acc, m) => {
    acc[m.date] = acc[m.date] || [];
    acc[m.date].push(m);
    return acc;
  }, {});

  return (
    <div className="calendar">
      {Object.keys(grouped).map((date) => (
        <div key={date} className="calendar-day">
          <h4>{date}</h4>

          {grouped[date].map((m) => (
            <p key={m.id}>
              {m.title} — {m.time}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ScheduleCalendar;
