"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PublicDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch("http://127.0.0.1:8000/course");
        const data = await res.json();
        setCourses(data || []);
      } catch (err) {
        console.error("Failed to load courses:", err);
      }
      setLoading(false);
    }

    loadCourses();
  }, []);

  if (loading) {
    return <div className="p-6">Loading courses...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Available Courses</h1>
      <p className="text-gray-600 mb-10">
        Explore our courses. Create an account to enroll and start learning.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>

            <div className="flex gap-4">
              <Link
                href={`/course/${course.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Learn More
              </Link>

              <Link
                href="/auth/login"
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Login to Enroll
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
