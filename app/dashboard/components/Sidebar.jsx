"use client";

import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        height: "100vh",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Dashboard</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Home */}
        <Link href="/dashboard">Home</Link>

        {/* Government Dashboard */}
        <Link href="/dashboard/government">Government Portal</Link>

        {/* Government Admin Viewer */}
        <Link href="/dashboard/government/admin">Government Admin</Link>

        {/* Divider */}
        <hr style={{ borderColor: "#ddd" }} />

        {/* Course Access */}
        <Link href="/dashboard/course-access">Course Access</Link>

        {/* ML Access */}
        <Link href="/dashboard/ml-access">ML Access</Link>

        {/* Virus Access */}
        <Link href="/dashboard/virus-access">Virus Access</Link>

        {/* Consulting Access */}
        <Link href="/dashboard/consulting-access">Consulting Access</Link>

        {/* Store Access */}
        <Link href="/dashboard/store-access">Store Access</Link>

        {/* Subscription Access */}
        <Link href="/dashboard/subscription-access">Subscription Access</Link>
      </nav>
    </div>
  );
}
