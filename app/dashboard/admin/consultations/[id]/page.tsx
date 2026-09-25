"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Consultation {
  id: number;
  student_name: string;
  team_name: string;
  datetime: string;
  platform: string;
  status: string;
  notes?: string;
  meeting_link: string;
  payment_status: string;
}

export default function ConsultationDetailsPage() {
  const { id } = useParams();

  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  const fetchConsultation = async () => {
    try {
      const res = await fetch(`${API}/consultations/${id}`);

      if (!res.ok) {
        let msg = "Failed to load consultation";
        try {
          const err = await res.json();
          msg = err.detail || msg;
        } catch {}
        setError(msg);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setConsultation(data);
    } catch {
      setError("Backend unreachable — cannot load consultation.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultation();
  }, [id]);

  const updateStatus = async (newStatus: string) => {
    setMessage(null);

    try {
      const res = await fetch(`${API}/consultations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        setMessage("Failed to update status");
        return;
      }

      setMessage("Status updated successfully");
      fetchConsultation();
    } catch {
      setMessage("Server error");
    }
  };

  if (loading) return <p className="p-6">Loading consultation...</p>;

  if (error)
    return (
      <p className="p-6 text-red-600 font-semibold">
        {error}
      </p>
    );

  if (!consultation)
    return <p className="p-6">Consultation not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Consultation Details</h1>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Meeting Link</label>
        <a
          href={consultation.meeting_link}
          target="_blank"
          className="text-blue-600 underline break-all"
        >
          {consultation.meeting_link}
        </a>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Student</label>
        <p>{consultation.student_name}</p>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Team Member</label>
        <p>{consultation.team_name}</p>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Date & Time</label>
        <p>{new Date(consultation.datetime).toLocaleString()}</p>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Platform</label>
        <p className="capitalize">{consultation.platform}</p>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Status</label>
        <p className="capitalize">{consultation.status}</p>
      </div>

      <div className="mb-6">
        <label className="block font-semibold">Notes</label>
        <p>{consultation.notes || "No notes"}</p>
      </div>

      <div className="mb-6">
        <label className="block font-semibold">Payment Status</label>
        <p className="capitalize">{consultation.payment_status}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => updateStatus("completed")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Mark Completed
        </button>

        <button
          onClick={() => updateStatus("cancelled")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cancel Consultation
        </button>

        <button
          onClick={() => updateStatus("scheduled")}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Reschedule (Admin)
        </button>
      </div>

      {message && (
        <p className="mt-4 p-2 bg-gray-100 border rounded">{message}</p>
      )}
    </div>
  );
}
