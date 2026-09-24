"use client";

import { useState } from "react";
import { validateToken } from "./ServiceTokenClient";

export default function VirusAccessButton({ userId, token }) {
  const [status, setStatus] = useState("");
  const [data, setData] = useState(null);

  const serviceName = "virus_list";

  const handleAccess = async () => {
    if (!token) {
      setStatus("Token required");
      return;
    }

    setStatus("Validating token...");

    // Validate the actual token
    const validation = await validateToken(token);

    if (!validation.success || !validation.valid) {
      setStatus("Invalid or inactive token");
      return;
    }

    setStatus("Accessing virus list...");

    // REQUIRED QUERY PARAMETERS
    const from_id = 1;
    const to_id = 999999;

    try {
      const response = await fetch(
        `https://ai-biosensing-backend-trial2.onrender.com/virus/list?from_id=${from_id}&to_id=${to_id}&token=${token}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        setStatus("Invalid or inactive token");
        return;
      }

      const json = await response.json();
      setData(json);
      setStatus("Access granted");
    } catch (err) {
      console.error(err);
      setStatus("Failed to access virus list");
    }
  };

  return (
    <div>
      <button onClick={handleAccess}>Access Virus List</button>
      <p>{status}</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
