"use client";
import Link from "next/link";

export default function DashboardNavigation() {
  return (
    <nav
      style={{
        padding: "1rem",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        marginBottom: "2rem",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Dashboard Navigation</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/dashboard/course-access">Course Access</Link>
        </li>

        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/dashboard/ml-access">ML Access</Link>
        </li>

        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/dashboard/virus-access">Virus Access</Link>
        </li>

        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/dashboard/consulting-access">Consulting Access</Link>
        </li>

        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/dashboard/store-access">Store Access</Link>
        </li>

        <li style={{ marginBottom: "0.5rem" }}>
          <Link href="/dashboard/subscription-access">Subscription Access</Link>
        </li>
      </ul>
    </nav>
  );
}
