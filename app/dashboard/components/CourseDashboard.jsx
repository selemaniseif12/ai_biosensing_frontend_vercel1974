"use client";
import { useState, useEffect } from "react";

export default function CourseDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("799");
  const [duration, setDuration] = useState("2 months");
  const [category, setCategory] = useState("Software Engineering / API Engineering");
  const [status, setStatus] = useState("published");

  // Load all courses
  useEffect(() => {
    fetch("http://localhost:8000/course/")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Create new course
  const handleCreateCourse = () => {
    const payload = {
      title,
      description,
      price: Number(price),
      duration,
      category,
      status,
    };

    fetch("http://localhost:8000/course/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((newCourse) => {
        setCourses([...courses, newCourse]);

        // Reset form
        setTitle("");
        setDescription("");
        setPrice("799");
        setDuration("2 months");
        setCategory("Software Engineering / API Engineering");
        setStatus("published");
      });
  };

  // Delete course
  const handleDeleteCourse = (id) => {
    fetch(`http://localhost:8000/course/${id}`, {
      method: "DELETE",
    }).then(() => {
      setCourses(courses.filter((c) => c.id !== id));
    });
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>Course Dashboard</h2>

      {/* CREATE COURSE */}
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <h3>Create New Course</h3>

        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: "80px" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Duration (e.g., 2 months)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Status (e.g., published)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleCreateCourse} style={buttonStyle}>
          Create Course
        </button>
      </div>

      {/* COURSE LIST */}
      <h3>All Courses</h3>

      {loading && <p>Loading courses...</p>}

      {!loading && courses.length === 0 && <p>No courses found.</p>}

      {!loading && courses.length > 0 && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.title}</td>

                {/* ⭐ FIXED FULL DESCRIPTION */}
                <td style={{ maxWidth: "300px", whiteSpace: "normal", wordWrap: "break-word" }}>
                  {course.description}
                </td>

                <td>${course.price}</td>
                <td>{course.duration}</td>
                <td>{course.category}</td>
                <td>{course.status}</td>

                <td>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const inputStyle = {
  display: "block",
  marginBottom: "10px",
  padding: "8px",
  width: "300px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};
