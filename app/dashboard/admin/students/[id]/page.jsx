"use client";

import { useState, useEffect } from "react";

interface StudentProfile {
  id: number;
  name: string;
  email: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
}

interface ActivityItem {
  id: number;
  action: string;
}

export default function AdminStudentDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function loadData() {
      try {
        const profileRes = await fetch(`${API}/profile/${id}`);
        if (!profileRes.ok) throw new Error("Failed to load profile");
        const profileData = await profileRes.json();
        setProfile(profileData);

        const coursesRes = await fetch(`${API}/enrollment/my-courses?user_id=${id}`);
        const coursesData = await coursesRes.json();
        setCourses(Array.isArray(coursesData) ? coursesData : []);

        const activityRes = await fetch(`${API}/activity/student/${id}`);
        const activityData = await activityRes.json();
        setActivity(Array.isArray(activityData) ? activityData : []);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setError("Failed to load student data.");
      }

      setLoading(false);
    }

    loadData();
  }, [id]);

  if (loading) return <p className="p-6">Loading student details...</p>;

  if (error)
    return (
      <p className="p-6 text-red-600 font-semibold">
        {error}
      </p>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>

      {profile && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Profile</h2>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Courses</h2>
        <ul className="list-disc pl-6">
          {courses.map((course) => (
            <li key={course.id}>
              <strong>{course.title}</strong> — {course.description}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Activity</h2>
        <ul className="list-disc pl-6">
          {activity.map((item) => (
            <li key={item.id}>{item.action}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
