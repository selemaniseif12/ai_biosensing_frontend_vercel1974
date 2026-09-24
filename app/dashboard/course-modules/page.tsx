"use client";

import { useEffect, useState } from "react";

type Course = {
  id: number;
  name: string;
};

type Module = {
  id: number;
  title: string;
  description: string;
};

export default function CourseModulesDashboard() {
  const [serviceToken, setServiceToken] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingModules, setLoadingModules] = useState(false);

  // Load courses
  const loadCourses = async () => {
    if (!serviceToken) return;
    try {
      setLoadingCourses(true);
      const res = await fetch("/api/courses", {
        headers: { Authorization: `Bearer ${serviceToken}` },
      });
      const data = await res.json();
      setCourses(data.courses || []);
    } finally {
      setLoadingCourses(false);
    }
  };

  // Load modules for selected course
  const loadModules = async (courseId: number) => {
    if (!serviceToken) return;
    try {
      setLoadingModules(true);
      const res = await fetch(`/api/course-modules?course_id=${courseId}`, {
        headers: { Authorization: `Bearer ${serviceToken}` },
      });
      const data = await res.json();
      setModules(data.modules || []);
    } finally {
      setLoadingModules(false);
    }
  };

  // When course changes, load its modules
  useEffect(() => {
    if (selectedCourseId !== null) {
      loadModules(selectedCourseId);
    }
  }, [selectedCourseId]);

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Course Modules Dashboard</h1>

      {/* Service Token */}
      <div
        style={{
          marginBottom: "20px",
          padding: "16px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <label style={{ display: "block", marginBottom: "8px" }}>
          Service Token:
        </label>
        <input
          type="text"
          placeholder="Enter your token"
          value={serviceToken}
          onChange={(e) => setServiceToken(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button
          onClick={loadCourses}
          style={{
            padding: "8px 16px",
            background: "#0057b8",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Load Courses
        </button>
        {loadingCourses && <p>Loading courses...</p>}
      </div>

      {/* Course selection */}
      <div
        style={{
          marginBottom: "20px",
          padding: "16px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2>Select Course</h2>
        <select
          value={selectedCourseId ?? ""}
          onChange={(e) =>
            setSelectedCourseId(
              e.target.value ? Number(e.target.value) : null
            )
          }
          style={{ width: "100%", padding: "10px" }}
        >
          <option value="">-- Select Course --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Modules list */}
      <div
        style={{
          padding: "16px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2>All Modules</h2>

        {loadingModules && <p>Loading modules...</p>}

        {!loadingModules && modules.length === 0 && (
          <p>No modules found for this course.</p>
        )}

        {modules.map((m) => (
          <div
            key={m.id}
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              marginBottom: "10px",
            }}
          >
            <h3>{m.title}</h3>
            <p>{m.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
