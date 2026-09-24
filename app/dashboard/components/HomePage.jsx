import React from "react";
export default function HomePage({ data }) {
  return (
    <div style={{ padding: "20px" }}>

      {/* Company Name */}
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Piezo‑Pico to Femtotechnology Sensors Inc.
      </h1>

      {/* Mission Statement */}
      <h2 style={{ fontSize: "22px", marginBottom: "20px", color: "#007bff" }}>
        Building Custom Commercial APIs for the Future
      </h2>

      {/* Company Introduction */}
      <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
        Piezo‑Pico to Femtotechnology Sensors Inc. leads the next revolution in building commercial APIs for
        biosensing technology, financial institutions, pharmaceutical companies, government agencies,
        educational institutions, and private organizations.
      </p>

      {/* Specialization */}
      <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "30px" }}>
        We specialize in custom‑designed API architectures tailored to your operational needs — from biosensing
        and machine learning integration to enterprise‑grade data systems.
      </p>

      {/* Process */}
      <section style={{ marginBottom: "30px" }}>
        <h2>Our Process</h2>
        <ul>
          <li><strong>Phase 1 — Paid Consultation:</strong> Short interview to define goals and specifications.</li>
          <li><strong>Phase 2 — Evaluation (Unpaid):</strong> Review and agreement on API structure, timeline, and contract.</li>
        </ul>
      </section>

      {/* Expertise */}
      <section style={{ marginBottom: "30px" }}>
        <h2>Our Expertise</h2>
        <ul>
          <li>Commercial API development for biosensing, data analytics, and institutional systems.</li>
          <li>Machine learning integration for virus detection and biosensor data classification.</li>
          <li>Custom backend & frontend engineering using Firebase, GitHub, Stripe and Vercel.</li>
          <li>ML training labs & courses accessible through our API (subscription‑based).</li>
          <li>Consulting services for organizations seeking customized API design or scientific/financial solutions.</li>
          <li>Cutting‑edge course development — “Full‑Stack API”, paid through API access.</li>

          {/* ⭐ NEW Expertise Lines */}
          <li>Data analytics using Power BI for enterprise dashboards and reporting.</li>
          <li>SQL‑based data engineering and database optimization.</li>
          <li>LLM‑powered automation and intelligent data processing.</li>
          <li>OpenAI model integration for advanced analytics and automation.</li>
          <li>ChatGPT‑based conversational interfaces and workflow assistants.</li>

          {/* ⭐ Newly Added Topics */}
          <li>API Integration of Machine Learning sensors based on visible and IR lights.</li>
          <li>API Integration of Machine Learning sensors based on MRI spectroscopies.</li>
          <li>API Integration of Machine Learning sensors based on Piezoelectric sensors.</li>
          <li>API Integration of Machine Learning sensors based on Robotic Sensors.</li>
        </ul>
      </section>

      {/* ⭐ Biography section removed completely */}
    </div>
  );
}

/* ⭐ Paste‑Image Component */
function PasteImageBox() {
  const [image, setImage] = React.useState(null);

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        const src = URL.createObjectURL(blob);
        setImage(src);
      }
    }
  };

  return (
    <div
      onPaste={handlePaste}
      className="w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-700 mt-4 flex items-center justify-center shadow-md border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
    >
      {image ? (
        <img
          src={image}
          alt="Pasted"
          className="w-40 h-40 rounded-full object-cover"
        />
      ) : (
        <span className="text-gray-500 dark:text-gray-300 text-sm text-center px-2">
          Paste Image Here (Ctrl+V)
        </span>
      )}
    </div>
  );
}

/* Existing CollapsibleCard Component */
function CollapsibleCard({ title, children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center text-lg font-semibold text-gray-800 dark:text-gray-100"
      >
        {title}
        <span className={`transform transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      <div
        className={`mt-3 overflow-hidden transition-all duration-500 ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
