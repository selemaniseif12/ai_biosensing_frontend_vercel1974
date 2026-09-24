"use client";
import { useEffect, useState } from "react";
import DocumentationIntro from "./DocumentationIntro";   // ⭐ import intro

export default function DocumentationList({ onSelect }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDocs() {
      try {
        const response = await fetch("http://localhost:8000/docs/list");
        const data = await response.json();

        const backendDocs = Array.isArray(data) ? data : [];
        setDocs(backendDocs);
      } catch (error) {
        console.error("Failed to load documents:", error);
        setDocs([]);
      } finally {
        setLoading(false);
      }
    }

    loadDocs();
  }, []);

  if (loading) {
    return <div className="p-4">Loading documentation...</div>;
  }

  return (
    <div className="p-4">

      {/* ⭐ Business One‑Page Intro */}
      <DocumentationIntro />

      <h2 className="text-xl font-semibold mb-4">Documentation</h2>

      <div className="space-y-3">
        {docs.map((doc, index) => (
          <div
            key={`${doc.id}-${index}`}
            className="p-3 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(doc)}
          >
            <div className="font-medium">{doc.title}</div>
            <div className="text-sm text-gray-600">{doc.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
