"use client";
import { useState } from "react";

export default function LessonForm({
  moduleTitle,
  onSubmit,
}: {
  moduleTitle: string;
  onSubmit: (lesson: {
    lesson_title: string;
    video_url?: string;
    slides_urls?: string[];
  }) => void;
}) {
  const [lessonTitle, setLessonTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [slidesUrls, setSlidesUrls] = useState("");

  return (
    <div className="mb-4">
      <h3 className="font-bold">Add Lesson to {moduleTitle}</h3>

      <input
        className="border p-2 w-full"
        placeholder="Lesson Title"
        value={lessonTitle}
        onChange={(e) => setLessonTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full mt-2"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <input
        className="border p-2 w-full mt-2"
        placeholder="Slides URLs (comma separated)"
        value={slidesUrls}
        onChange={(e) => setSlidesUrls(e.target.value)}
      />

      <button
        className="bg-green-600 text-white px-4 py-2 mt-2"
        onClick={() => {
          onSubmit({
            lesson_title: lessonTitle,
            video_url: videoUrl,
            slides_urls: slidesUrls.split(",").map((s) => s.trim()),
          });
          setLessonTitle("");
          setVideoUrl("");
          setSlidesUrls("");
        }}
      >
        Add Lesson
      </button>
    </div>
  );
}
