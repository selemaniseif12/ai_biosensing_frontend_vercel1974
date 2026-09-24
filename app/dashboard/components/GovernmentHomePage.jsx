"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function GovernmentHomePage() {
  const router = useRouter();

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Piezo Pico to Femtotechnology Sensors Inc.
      </h1>

      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        National Biosensing Infrastructure for Public Health and Security
      </h2>

      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
        Real Time Pathogen Detection. Femtogram Level Sensitivity. API Driven National Surveillance.
        We develop advanced scientific APIs designed to equip government agencies with next‑generation
        biosensing capabilities—detecting airborne pathogens, biomarkers, and environmental threats in seconds.
        Our platform is fully operational, and our first machine learning models (ML v2 and ML v6) are already
        deployed for research and academic institutional use. Our primary focus is fulfilling government
        requirements through formal consultation and contract‑based deployment.
      </p>

      {/* ⭐ NEW TECHNICAL PARAGRAPH (REPLACES BUTTON BLOCK) */}
      <div style={{ marginTop: "30px", padding: "20px", background: "#f7f7f7", borderRadius: "8px" }}>
        <p style={{ fontSize: "16px", lineHeight: "1.7" }}>
          Government agencies initiating formal collaboration should begin by accessing the{" "}
          <span style={{ fontWeight: "bold" }}>Store</span> to select the appropriate consulting package
          (Fixed or Custom). Once selected, the package will appear in the{" "}
          <span style={{ fontWeight: "bold" }}>Cart</span>, where agents can review the consultation details
          before proceeding to <span style={{ fontWeight: "bold" }}>Checkout</span> to finalize the initial
          engagement. After a successful subscription, authorized personnel will gain access to the educational
          versions of our ML v2 and ML v6 machine learning models, enabling secure evaluation of biosensing
          analytics, classification pipelines, and early‑stage deployment workflows.
        </p>
      </div>

      <h2 style={{ marginTop: "40px" }}>Supporting National Priorities</h2>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
        Our mission is to strengthen public health resilience, enhance national biodefense capabilities,
        and provide governments with real‑time biosensing intelligence.
      </p>

      <h2 style={{ marginTop: "40px" }}>Government Applications</h2>

      <h3>Public Health & Epidemiology</h3>
      <ul>
        <li>Real‑time airborne pathogen detection</li>
        <li>Early outbreak alerts</li>
        <li>Integration with national surveillance networks</li>
      </ul>

      <h3>National Security & Defense</h3>
      <ul>
        <li>Biohazard detection in high‑risk facilities</li>
        <li>Monitoring airborne threats at borders</li>
        <li>AI‑driven threat classification</li>
      </ul>

      <h3>Critical Infrastructure Protection</h3>
      <ul>
        <li>Air quality monitoring in manufacturing</li>
        <li>Biosensing for aerospace and defense</li>
        <li>Environmental monitoring for government labs</li>
      </ul>

      <h2 style={{ marginTop: "40px" }}>Government Consultation & Integration</h2>

      <h3>Phase 1 — Paid Consultation</h3>
      <p>Technical interview to define mission goals and biosensing requirements.</p>

      <h3>Phase 2 — Evaluation (Unpaid)</h3>
      <p>Review of API architecture, deployment timeline, and security model.</p>

      <h2 style={{ marginTop: "40px" }}>Government Focused Expertise</h2>
      <ul>
        <li>Commercial API development</li>
        <li>Machine learning integration</li>
        <li>Custom backend & frontend engineering</li>
        <li>ML training labs & courses</li>
        <li>Enterprise analytics</li>
        <li>LLM‑powered automation</li>
        <li>OpenAI model integration</li>
        <li>Full deployment using Vercel, AWS, Google Cloud</li>
      </ul>

      <h2 style={{ marginTop: "40px" }}>Our Technology</h2>
      <ul>
        <li>Real‑time airborne pathogen detection</li>
        <li>Femtogram mass resolution</li>
        <li>Antibody‑functionalized QCM surfaces</li>
        <li>AI‑driven anomaly detection</li>
        <li>Cloud‑based diagnostics</li>
      </ul>

      <h2 style={{ marginTop: "40px" }}>Scientific Leadership</h2>
      <p>
        Under the leadership of Dr. Selemani Mziray, our company has transformed QCM technology into a
        machine‑learning‑ready diagnostic platform.
      </p>

      <h2 style={{ marginTop: "40px" }}>Built in Canada. Engineered for National Resilience.</h2>
    </div>
  );
}
