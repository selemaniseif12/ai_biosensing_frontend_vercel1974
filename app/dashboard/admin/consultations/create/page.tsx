"use client";

import { useEffect, useState } from "react";

interface Student {
  id: number;
  name?: string;
}

interface TeamMember {
  id: number;
  name?: string;
}

interface ConsultationForm {
  student_id: string;
  team_id: string;
  datetime: string;
  platform: string;
  meeting_link: string;
  notes: string;
}

export default function CreateConsultationPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ConsultationForm>({
    student_id: "",
    team_id: "",
    datetime: "",
    platform: "",
    meeting_link: "",
    notes: "",
  });

  const API = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async () => {
    try {
      setLoading(true);

      const resStudents = await fetch(`${API}/students`);
      const resTeams = await fetch(`${API}/teams`);

      if (!resStudents.ok || !resTeams.ok) {
        setError("Failed to load students or team members.");
        setLoading(false);
        return;
      }

      const dataStudents = await resStudents.json();
      const dataTeams = await resTeams.json();

      setStudents(Array.isArray(dataStudents) ? dataStudents : []);
      setTeams(Array.isArray(dataTeams) ? dataTeams : []);
    } catch {
      setError("Backend unreachable — cannot load data.");
      setStudents([]);
      setTeams([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/consultations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Consultation created successfully!");
      } else {
        alert("Failed to create consultation.");
      }
    } catch {
      alert("Network error — could not create consultation.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  if (error)
    return (
      <p className="p-6 text-red-600 font-semibold">
        {error}
      </p>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create Consultation</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Student</label>
          <select
            value={form.student_id}
            onChange={(e) => setForm({ ...form, student_id: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name ?? "Unnamed Student"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Team</label>
          <select
            value={form.team_id}
            onChange={(e) => setForm({ ...form, team_id: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select team</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name ?? "Unnamed Team"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Date & Time</label>
          <input
            type="datetime-local"
            value={form.datetime}
            onChange={(e) => setForm({ ...form, datetime: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Platform</label>
          <input
            type="text"
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            className="border p-2 rounded w-full"
            placeholder="Zoom, Google Meet, Teams..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Meeting Link</label>
          <input
            type="text"
            value={form.meeting_link}
            onChange={(e) => setForm({ ...form, meeting_link: e.target.value })}
            className="border p-2 rounded w-full"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="border p-2 rounded w-full"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Consultation
        </button>
      </form>
    </div>
  );
}
