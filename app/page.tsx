"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="p-10 space-y-10">
      <h1 className="text-4xl font-bold">AI Biosensing Platform</h1>

      <p className="text-lg text-gray-700">
        Welcome to the AI Biosensing Platform. Choose a dashboard or module to begin.
      </p>

      <div className="space-y-4">
        <Link
          href="/dashboard"
          className="block px-4 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Open Main Dashboard
        </Link>

        <Link
          href="/dashboard/subscription-access"
          className="block px-4 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
        >
          Subscription Access
        </Link>

        <Link
          href="/dashboard/virus-access"
          className="block px-4 py-3 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
        >
          Virus Analysis Tools
        </Link>

        <Link
          href="/documentation"
          className="block px-4 py-3 rounded-md bg-gray-800 text-white hover:bg-gray-900 transition"
        >
          Documentation
        </Link>
      </div>
    </div>
  );
}
