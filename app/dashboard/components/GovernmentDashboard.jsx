"use client";
import React, { useState } from "react";

export default function GovernmentDashboard() {
  const [form, setForm] = useState({
    organization: "",
    department: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    priority: "medium",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/government/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Government Communication Portal
      </h1>

      <p style={{ fontSize: "16px", marginBottom: "20px", lineHeight: "1.6" }}>
        This secure dashboard enables direct communication between government agencies
        and Piezo‑Pico to Femtotechnology Sensors Inc. Submit your inquiry to begin
        consultation, request technical documentation, or initiate a pilot deployment.
      </p>

      <h2 style={{ fontSize: "22px", marginBottom: "15px", color: "#007bff" }}>
        Government Contact Request
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        
        <input
          type="text"
          name="organization"
          placeholder="Government Organization"
          value={form.organization}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department / Division"
          value={form.department}
          onChange={handleChange}
        />

        <input
          type="text"
          name="contactName"
          placeholder="Contact Name"
          value={form.contactName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Official Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Describe your inquiry, requirements, or interest in ML v2 / ML v6."
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
        />

        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit Request
        </button>
      </form>

      {status === "loading" && (
        <p style={{ marginTop: "15px", color: "#555" }}>Submitting request...</p>
      )}

      {status === "success" && (
        <p style={{ marginTop: "15px", color: "green" }}>
          Request submitted successfully. Our team will contact you shortly.
        </p>
      )}

      {status === "error" && (
        <p style={{ marginTop: "15px", color: "red" }}>
          Error submitting request. Please try again.
        </p>
      )}
    </div>
  );
}
