"use client";

import { useEffect, useState } from "react";

export default function OutlineEditor({ courseId }: { courseId: number }) {
  const [outline, setOutline] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");

  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDescription, setNewLessonDescription] = useState("");

  // ---------------------------------------------------------
  // LOAD OUTLINE
  // ---------------------------------------------------------
  async function loadOutline() {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/course/outline`);
      if (!res.ok) throw new Error("Failed to load outline");
      const data = await res.json();
      setOutline(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOutline();
  }, []);

  // ---------------------------------------------------------
  // ADD MODULE
  // ---------------------------------------------------------
  async function addModule() {
    if (!newModuleTitle.trim()) return;

    await fetch(`http://localhost:8000/course/outline/${courseId}/module`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module_title: newModuleTitle,
        module_description: newModuleDescription,
      }),
    });

    setNewModuleTitle("");
    setNewModuleDescription("");
    loadOutline();
  }

  // ---------------------------------------------------------
  // ADD LESSON
  // ---------------------------------------------------------
  async function addLesson() {
    if (!selectedModule || !newLessonTitle.trim()) return;

    await fetch(
      `http://localhost:8000/course/outline/${courseId}/module/${selectedModule}/lesson`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lesson_title: newLessonTitle,
          lesson_description: newLessonDescription,
        }),
      }
    );

    setNewLessonTitle("");
    setNewLessonDescription("");
    loadOutline();
  }

  // ---------------------------------------------------------
  // DELETE LESSON
  // ---------------------------------------------------------
  async function deleteLesson(moduleTitle: string, lessonTitle: string) {
    await fetch(
      `http://localhost:8000/course/outline/${courseId}/module/${moduleTitle}/lesson/${lessonTitle}`,
      { method: "DELETE" }
    );
    loadOutline();
  }

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------
  if (loading) return <p>Loading outline...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!outline) return <p>No outline found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-xl font-bold mb-4">Course Outline Editor</h2>

      {/* ADD MODULE */}
      <div className="border p-4 mb-6">
        <h3 className="font-bold mb-2">Add Module</h3>
        <input
          type="text"
          placeholder="Module Title"
          value={newModuleTitle}
          onChange={(e) => setNewModuleTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Module Description"
          value={newModuleDescription}
          onChange={(e) => setNewModuleDescription(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button onClick={addModule} className="bg-blue-600 text-white px-4 py-2">
          Add Module
        </button>
      </div>

      {/* ADD LESSON */}
      {selectedModule && (
        <div className="border p-4 mb-6">
          <h3 className="font-bold mb-2">Add Lesson to {selectedModule}</h3>
          <input
            type="text"
            placeholder="Lesson Title"
            value={newLessonTitle}
            onChange={(e) => setNewLessonTitle(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <textarea
            placeholder="Lesson Description"
            value={newLessonDescription}
            onChange={(e) => setNewLessonDescription(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button onClick={addLesson} className="bg-green-600 text-white px-4 py-2">
            Add Lesson
          </button>
        </div>
      )}

      {/* EXISTING OUTLINE */}
      <h3 className="font-bold mt-6">Existing Outline</h3>

      {outline.modules.map((module: any) => (
        <div key={module.module_id} className="border p-4 mt-4">
          <h4
            className="font-bold cursor-pointer"
            onClick={() => setSelectedModule(module.title)}
          >
            {module.title}
          </h4>
          <p>{module.description}</p>

          {module.lessons.map((lesson: any) => (
            <div key={lesson.id} className="ml-4 mt-2">
              <p>
                <strong>{lesson.title}</strong> — {lesson.description}
              </p>
              <button
                className="text-red-600"
                onClick={() => deleteLesson(module.title, lesson.title)}
              >
                Delete Lesson
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
