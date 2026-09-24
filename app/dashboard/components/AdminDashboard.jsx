"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudents() {
      try {
        const res = await fetch("http://127.0.0.1:8000/auth/users");
        const data = await res.json();
        setStudents(data || []);
      } catch (err) {
        console.error("Failed to load students:", err);
      }
      setLoading(false);
    }

    loadStudents();
  }, []);

  if (loading) {
    return <div className="p-6">Loading admin dashboard...</div>;
  }

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
