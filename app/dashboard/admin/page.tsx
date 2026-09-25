"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStudents() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/users`;
        const res = await fetch(url);

        if (!res.ok) {
          let msg = "Error loading users";
          try {
            const err = await res.json();
            msg = err.detail || msg;
          } catch {}
          setError(msg);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setStudents(data);
      } catch {
        setError("Backend unreachable — cannot load users.");
      }

      setLoading(false);
    }

    loadStudents();
  }, []);

  if (loading) return <div className="p-6">Loading admin dashboard...</div>;

  if (error)
    return (
      <div className="p-6 text-red-600 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {students.map((student) => (
          <div key={student.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{student.full_name}</h2>
            <p className="text-gray-600">{student.email}</p>

            <Link
              href={`/dashboard/admin/students/${student.id}`}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
            >
              View Student
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
