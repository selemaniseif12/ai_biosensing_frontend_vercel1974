"use client";
import React, { useState } from "react";

export default function ConsultingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    api_key: "",
    project_description: "",
    services: []
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const servicesList = [
    "Biosensing Technology",
    "Machine Learning Integration",
    "API Architecture",
    "Sensor Simulation",
    "Virus Detection ML",
    "Power BI Analytics",
    "SQL Data Engineering",
    "LLM Automation",
    "OpenAI Integration",
    "ChatGPT Workflow Assistants"
  ];

  const toggleService = (service) => {
    setForm((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service]
      };
    });
  };

  const submitForm = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/consulting`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setError(errData.detail || "Failed to send consulting request.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setMessage(data.message || "Your consulting request was sent successfully.");
    } catch (err) {
      console.error("Error submitting consulting request:", err);
      setError("Network error: Unable to deliver your consulting request.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Consulting Services</h2>

      <p>
        We provide specialized consulting services that help organizations leverage
        advanced data analytics, modern API integrations, and emerging technologies.
      </p>

      <h3>Phase 1 — Client Project Submission</h3>

      <p style={{ lineHeight: "1.7" }}>
        Government agencies, students, and commercial customers initiating formal collaboration
        should begin by accessing the <strong>Store</strong> to select the appropriate consulting
        package (Fixed or Custom) or machine learning package. Once selected, the package will
        appear in the <strong>Cart</strong>, where all consultation and ML model details can be
        reviewed before proceeding to <strong>Checkout</strong> to finalize the initial engagement.
        After a successful subscription, authorized personnel gain access to the educational
        versions of our ML v2 and ML v6 machine learning models, enabling secure evaluation of
        biosensing analytics, classification pipelines, and early‑stage deployment workflows.
      </p>

      <h3>Phase 2 — Consulting Pre‑Contract Session</h3>
      <p><strong>Price:</strong> $199 CAD &nbsp; <strong>Duration:</strong> 1 hour</p>

      <h3>Proceed to Payment</h3>
      <p>
        Payment for this session is handled through your <strong>Store Dashboard</strong>.
        This page only displays the consulting fee.
      </p>

      <button
        disabled
        style={{
          marginTop: "10px",
          padding: "12px 24px",
          backgroundColor: "gray",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "not-allowed",
          fontSize: "16px",
          fontWeight: "bold"
        }}
      >
        Pay $199 CAD (Store Dashboard Only)
      </button>

      <p>
        Before entering a full consulting contract, every client must complete a
        one‑hour pre‑contract consultation.
      </p>

      <h4>Purpose of the Session</h4>
      <ul>
        <li>Evaluate the client’s request</li>
        <li>Determine project viability</li>
        <li>Decide whether a full consulting contract should follow</li>
      </ul>

      <h4>Outcome of the Session</h4>
      <ul>
        <li>We determine whether our company can take on the client’s project</li>
        <li>We outline the next steps and provide initial guidance</li>
        <li>We decide whether a full consulting contract is appropriate</li>
      </ul>

      <p><strong>Payment is required before the consultation begins.</strong></p>

      <h3>Phase 3 — Contract Alignment Session (Free)</h3>
      <p><strong>Duration:</strong> 45 minutes</p>

      <hr />

      <h3>Consulting Request Form</h3>

      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
      /><br />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
      /><br />

      <textarea
        placeholder="Describe your project..."
        value={form.project_description}
        onChange={(e) => setForm({ ...form, project_description: e.target.value })}
        style={{ padding: "10px", width: "400px", height: "120px", marginBottom: "20px" }}
      />

      <h4>Select Required Services:</h4>
      {servicesList.map((service) => (
        <div key={service}>
          <label>
            <input
              type="checkbox"
              checked={form.services.includes(service)}
              onChange={() => toggleService(service)}
            />
            {" "}{service}
          </label>
        </div>
      ))}

      <button
        onClick={submitForm}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {loading ? "Sending..." : "Submit Consulting Request"}
      </button>

      {message && (
        <p style={{ marginTop: "20px", color: "green", fontWeight: "bold" }}>
          {message}
        </p>
      )}

      {error && (
        <p style={{ marginTop: "20px", color: "red", fontWeight: "bold" }}>
          {error}
        </p>
      )}
    </div>
  );
}
