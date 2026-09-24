"use client";
import { useState, useEffect } from "react";

export default function CourseContentDashboard() {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form fields
  const [courseId, setCourseId] = useState("");
  const [moduleNumber, setModuleNumber] = useState("");
  const [video, setVideo] = useState("");
  const [slidesPdf, setSlidesPdf] = useState("");
  const [website, setWebsite] = useState("");
  const [quizFile, setQuizFile] = useState("");

  // Load all course content
  useEffect(() => {
    fetch("http://localhost:8000/course-content/")
      .then((res) => res.json())
      .then((data) => {
        setContentList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Create new course content
  const handleCreateContent = () => {
    const payload = {
      course_id: Number(courseId),
      content_json: JSON.stringify({
        module: Number(moduleNumber),
        video,
        slides_pdf: slidesPdf,
        website,
        quiz_file: quizFile,
      }),
    };

    fetch("http://localhost:8000/course-content/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((newContent) => {
        setContentList([...contentList, newContent]);
        setCourseId("");
        setModuleNumber("");
        setVideo("");
        setSlidesPdf("");
        setWebsite("");
        setQuizFile("");
      });
  };

  // Delete course content
  const handleDeleteContent = (id) => {
    fetch(`http://localhost:8000/course-content/${id}`, {
      method: "DELETE",
    }).then(() => {
      setContentList(contentList.filter((c) => c.id !== id));
    });
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>Course Content Dashboard</h2>

      {/* CREATE CONTENT */}
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <h3>Create New Course Content</h3>

        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Module Number"
          value={moduleNumber}
          onChange={(e) => setModuleNumber(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Video Path (e.g., videos/module1.mp4)"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Slides PDF Path (e.g., slides/module1.pdf)"
          value={slidesPdf}
          onChange={(e) => setSlidesPdf(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Website URL"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Quiz File Path (e.g., data/quizzes/module_1.json)"
          value={quizFile}
          onChange={(e) => setQuizFile(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleCreateContent} style={buttonStyle}>
          Create Content
        </button>
      </div>

      {/* CONTENT LIST */}
      <h3>All Course Content</h3>

      {loading && <p>Loading content...</p>}

      {!loading && contentList.length === 0 && <p>No course content found.</p>}

      {!loading && contentList.length > 0 && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course ID</th>
              <th>Module</th>
              <th>Video</th>
              <th>Slides PDF</th>
              <th>Website</th>
              <th>Quiz File</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contentList.map((content) => {
              const parsed = JSON.parse(content.content_json);

              return (
                <tr key={content.id}>
                  <td>{content.id}</td>
                  <td>{content.course_id}</td>
                  <td>{parsed.module}</td>
                  <td>{parsed.video}</td>
                  <td>{parsed.slides_pdf}</td>
                  <td>{parsed.website}</td>
                  <td>{parsed.quiz_file}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteContent(content.id)}
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
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
