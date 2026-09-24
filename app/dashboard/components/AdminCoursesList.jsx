"use client";
export default function AdminCoursesList({ course, onOpenOutline }) {
  if (!course) {
    return <p>No course found.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Admin Courses</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>{course.title}</h3>
        <p>{course.description}</p>

        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Price:</strong> ${course.price}</p>
        <p><strong>Status:</strong> {course.status}</p>

        <p><strong>Modules:</strong> {course.modules?.length || 0}</p>

        <button
          onClick={() => onOpenOutline(course.id)}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Edit Course Outline
        </button>
      </div>
    </div>
  );
}
