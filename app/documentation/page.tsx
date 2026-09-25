"use client";

interface DocItem {
  title: string;
  url: string;
}

export default function DocumentationPage() {
  const docs: DocItem[] = [
    {
      title: "backend_frontend_architecture_docs",
      url: "https://your-vercel-blob-url/backend_frontend_architecture_docs.pdf",
    },
    {
      title: "biosensing_platform_docs",
      url: "https://your-vercel-blob-url/biosensing_platform_docs.pdf",
    },
    {
      title: "course_outline_fullstack_api_engineering_docs",
      url: "https://your-vercel-blob-url/course_outline_fullstack_api_engineering_docs.pdf",
    },
    {
      title: "general_auth_token_access_system",
      url: "https://your-vercel-blob-url/general_auth_token_access_system.pdf",
    },
    {
      title: "main_py_documentation_docs",
      url: "https://your-vercel-blob-url/main_py_documentation_docs.pdf",
    },
    {
      title: "ml_models_folder_structure_docs",
      url: "https://your-vercel-blob-url/ml_models_folder_structure_docs.pdf",
    },
    {
      title: "payment_system_architecture_docs",
      url: "https://your-vercel-blob-url/payment_system_architecture_docs.pdf",
    },
    {
      title: "router_documentation_docs",
      url: "https://your-vercel-blob-url/router_documentation_docs.pdf",
    },
    {
      title: "swagger_documentation_docs",
      url: "https://your-vercel-blob-url/swagger_documentation_docs.pdf",
    },
    {
      title: "token_based_access_system",
      url: "https://your-vercel-blob-url/token_based_access_system.pdf",
    },
    {
      title: "updated_swagger_public",
      url: "https://your-vercel-blob-url/updated_swagger_public.pdf",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Documents</h1>

      <div className="space-y-3">
        {docs.map((doc) => (
          <button
            key={doc.title}
            onClick={() => window.open(doc.url, "_blank")}
            className="block w-full text-left px-4 py-2 rounded-md bg-gray-200 hover:bg-blue-600 hover:text-white transition"
          >
            {doc.title}
          </button>
        ))}
      </div>
    </div>
  );
}
