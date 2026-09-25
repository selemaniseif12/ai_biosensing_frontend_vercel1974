// app/dashboard/admin/store/data/products.jsx

export const products = [
  {
    id: 1,
    item_id: "consulting_fixed",
    name: "Fixed Consulting Package",
    type: "service",
    price_usd: 199.0,
    billing_period: "one_time",
    description: "One-hour consulting session for biosensing or ML guidance",
    disabled: false,
  },
  {
    id: 2,
    item_id: "consulting_custom",
    name: "Custom Consulting Package",
    type: "service",
    price_usd: 499.0,
    billing_period: "one_time",
    description: "Custom project consulting for labs, research teams, or startups",
    disabled: false,
  },
  {
    id: 3,
    item_id: "course_intro",
    name: "Intro to Biosensing & Frequency Noise",
    type: "course",
    price_usd: 59.0,
    billing_period: "3_months",
    description: "Foundational course on QCM sensors, noise, and biosensing basics",
    disabled: false,
  },

  // ⭐ Disabled until V2 1.1
  {
    id: 4,
    item_id: "course_ml_v2",
    name: "ML V2 Training Course",
    type: "course",
    price_usd: 79.0,
    billing_period: "3_months",
    description: "Training on XGBoost V2 model, noise tables, and lab workflow",
    disabled: true,
  },

  // ⭐ Disabled until V6 1.2
  {
    id: 5,
    item_id: "course_ml_v6",
    name: "ML V6 Training Course",
    type: "course",
    price_usd: 99.0,
    billing_period: "3_months",
    description: "Advanced RandomForest V6 training with 120k dataset",
    disabled: true,
  },

  {
    id: 6,
    item_id: "course_fullstack_api",
    name: "Full Stack API Engineering Course",
    type: "course",
    price_usd: 799.0,
    billing_period: "3_months",
    description:
      "End-to-end API engineering, backend, routers, models, and dashboards",
    disabled: false,
  },

  // ⭐ Disabled until V2 1.1
  {
    id: 7,
    item_id: "ml_v2",
    name: "ML V2 Model Access",
    type: "digital",
    price_usd: 49.0,
    billing_period: "3_months",
    description:
      "Access to Analyzer V2 model, logs, noise tables, and predictions",
    disabled: true,
  },

  // ⭐ Disabled until V6 1.2
  {
    id: 8,
    item_id: "ml_v6",
    name: "ML V6 Model Access",
    type: "digital",
    price_usd: 69.0,
    billing_period: "3_months",
    description:
      "Access to Analyzer V6 model, logs, noise tables, and predictions",
    disabled: true,
  },

  // ⭐ Disabled until both versions are ready
  {
    id: 9,
    item_id: "ml_bundle_v2_v6",
    name: "ML V2/V6 Bundle",
    type: "digital",
    price_usd: 99.0,
    billing_period: "3_months",
    description:
      "Combined access to both ML models with comparison dashboard",
    disabled: true,
  },

  {
    id: 10,
    item_id: "virus_list",
    name: "Virus Database Subscription",
    type: "digital",
    price_usd: 29.0,
    billing_period: "3_months",
    description:
      "Access to 100-virus database with mass, metadata, and probabilities",
    disabled: false,
  },
  {
    id: 11,
    item_id: "device_lowgrade",
    name: "Low-Grade Patented Biosensing Device",
    type: "physical",
    price_usd: 299.0,
    billing_period: "one_time",
    description:
      "Educational QCM device for practical biosensing experiments",
    disabled: false,
  },
];
