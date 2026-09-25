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

      {/* EDUCATION & CERTIFICATIONS SECTION */}
      <div className="mt-12 space-y-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Education & Certifications
        </h2>

        <div className="space-y-6 text-lg leading-relaxed">
          <div>
            <h3 className="text-xl font-semibold">
              DeepLearning.AI – Coursera (October 2025)
            </h3>
            <p>
              Certified Specialist in <strong>Deep Learning and LLM Applications</strong> using Python
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Specialized in Prompt Engineering through OpenAI with LLM.</li>
              <li>Designed and coded an interactive dashboard with transaction-based visualizations and dynamic filtering.</li>
              <li>Developed Python-based automation for data extraction, analysis, and graphical display.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Data Science Infinity (August 2025)
            </h3>
            <p>
              Certified <strong>Data Analyst Specialist</strong> – Python & SQL
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Retrieved and processed financial datasets from MySQL relational databases.</li>
              <li>Conducted customer loyalty analysis for over 1M customers based on proximity to retail locations.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Northern Alberta Institute of Technology (NAIT), 2021–2024
            </h3>
            <p>Diploma in <strong>Nanosystem Engineering Technology</strong></p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Specialized in nanosystems data preparation, statistical analysis, and visualization using JMP, Origin, and Excel.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Alabama A&M University, Huntsville, AL, USA (2002–2007)
            </h3>
            <p>Ph.D. in <strong>Applied Physics – Materials Science</strong></p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Focused on materials characterization, data analytics, and modeling.</li>
              <li>Conducted quantitative analysis using JMP, Origin, and Excel.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
