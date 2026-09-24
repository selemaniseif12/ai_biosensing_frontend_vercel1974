// services/outline.ts

const BASE = "http://localhost:8000/course";

// ---------------------------------------------------------
// GET OUTLINE (DB-based)
// ---------------------------------------------------------
export async function getOutline() {
  const res = await fetch(`${BASE}/outline`);
  if (!res.ok) throw new Error("Failed to load outline");
  return await res.json();
}

// ---------------------------------------------------------
// ADD MODULE (lookup by title)
// ---------------------------------------------------------
export async function addModule(courseId: number, moduleTitle: string, moduleDescription: string) {
  const res = await fetch(`${BASE}/outline/${courseId}/module`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      module_title: moduleTitle,
      module_description: moduleDescription,
    }),
  });

  if (!res.ok) throw new Error("Failed to add module");
  return await res.json();
}

// ---------------------------------------------------------
// ADD LESSON (lookup module by title)
// ---------------------------------------------------------
export async function addLesson(
  courseId: number,
  moduleTitle: string,
  lessonTitle: string,
  lessonDescription: string
) {
  const res = await fetch(
    `${BASE}/outline/${courseId}/module/${moduleTitle}/lesson`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lesson_title: lessonTitle,
        lesson_description: lessonDescription,
      }),
    }
  );

  if (!res.ok) throw new Error("Failed to add lesson");
  return await res.json();
}

// ---------------------------------------------------------
// DELETE LESSON (lookup module + lesson by title)
// ---------------------------------------------------------
export async function deleteLesson(courseId: number, moduleTitle: string, lessonTitle: string) {
  const res = await fetch(
    `${BASE}/outline/${courseId}/module/${moduleTitle}/lesson/${lessonTitle}`,
    { method: "DELETE" }
  );

  if (!res.ok) throw new Error("Failed to delete lesson");
  return await res.json();
}
