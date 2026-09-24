"use client";
import { useState } from "react";
import CourseList from "./CourseList";

export default function CoursesPage({ course }) {
  const [fullCourse, setFullCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadFullCourse = (courseId) => {
    setLoading(true);

    fetch(`http://localhost:8000/course-outlines/${courseId}/full`)
      .then((res) => res.json())
      .then((data) => {
        setFullCourse(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div>
      <h2>Courses</h2>

      {/* Course Overview */}
      <CourseList course={course} onSelectCourse={loadFullCourse} />

      {/* Loading State */}
      {loading && <p>Loading course details...</p>}

      {/* Full Course Details */}
      {fullCourse && (
        <div style={{ marginTop: "30px" }}>
          <h3>{fullCourse.title}</h3>
          <p>{fullCourse.description}</p>

          <h4>Modules</h4>
          {fullCourse?.modules?.map((module) => (
            <div
              key={module.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "8px",
              }}
            >
              <h5>{module.title}</h5>
              <p>{module.description}</p>

              <h6>Lessons</h6>
              {module?.lessons?.map((lesson) => (
                <div key={lesson.id} style={{ marginLeft: "20px" }}>
                  <p><strong>{lesson.title}</strong></p>
                  <p>{lesson.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
