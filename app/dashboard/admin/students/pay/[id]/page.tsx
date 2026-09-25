"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Course {
  id: number;
  title: string;
  description: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
}

export default function CourseViewerPage() {
  const { id } = useParams(); // FIXED: correct param name

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`${API}/courses/${id}`);

        if (!res.ok) {
          let msg = "Failed to load course";
          try {
            const err = await res.json();
            msg = err.detail || msg;
          } catch {}
          setError(msg);
          setLoading(false);
          return;
        }

        const data = await res.json();

        setCourse(data.course || null);
        setModules(Array.isArray(data.modules) ? data.modules : []);
      } catch {
        setError("Backend unreachable — cannot load course.");
      }

      setLoading(false);
    }

    fetchCourse();
  }, [id]);

  if (loading) return <p className="p-6">Loading course...</p>;

  if (error)
    return (
      <p className="p-6 text-red-600 font-semibold">
        {error}
      </p>
    );

  if (!course)
    return <p className="p-6">Course not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Course: {course.title}</h1>

      {modules.map((m) => (
        <div key={m.id} className="mb-4">
          <h2 className="text-xl font-semibold">{m.title}</h2>
          <p className="text-gray-700">{m.description}</p>
        </div>
      ))}
    </div>
  );
}
