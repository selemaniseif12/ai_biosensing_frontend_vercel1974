"use client";

import Image from "next/image";

export default function Profile() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Dr. Selemani Mziray — CEO & Founder  
        <br />
        Piezo‑Pico to Femtotechnology Sensors Inc.
      </h1>

      <div className="flex flex-col md:flex-row md:items-start md:gap-8">
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <Image
            src="/profile.png"
            alt="Profile"
            width={220}
            height={220}
            className="rounded-xl shadow-lg object-cover"
            priority
          />
        </div>

        <div className="text-lg leading-relaxed space-y-6">
          <p>
            Dr. Selemani Mziray is a Full‑Stack API Engineer and founder working at
            the intersection of advanced biosensing and AI‑driven software
            development. His technical foundation includes AI certification from
            DeepLearning.AI under Andrew Ng (Coursera verification:
            https://coursera.org/verify/DZA9TFVEOAQO), validating his skills in
            Python, AI integration, data analysis, and generative AI.
          </p>

          <p>
            He built practical expertise in LLM‑based applications, API
            architecture, machine learning, and automation—accelerated by early
            use of AI assistants for debugging and rapid prototyping. This
            progression led him to establish Piezo – Pico to Femtotechnology
            Sensors Inc., a company pioneering next‑generation biosensing with
            intelligent API systems.
          </p>

          <h2 className="text-2xl font-semibold">
            Scientific Innovation & Patented Biosensing Technology
          </h2>

          <p>
            US Patent 10,830,738 B2 — High Q‑Factor AT‑Cut Quartz Crystal
            Microbalance Femtogram Mass Sensor  
            <br />
            US Patent Application 2020/0173898 A1 — Process for Detecting
            Electrolytes & Biomarkers with Femtogram Resolution
          </p>

          <p>
            These patented QCM systems enable real‑time detection of viruses,
            bacteria, troponins, and electrolytes — forming the foundation of the
            company’s biosensing APIs and ML training labs.
          </p>
        </div>
      </div>
    </div>
  );
}
