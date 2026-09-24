import { useState } from "react";

export default function TokenAdminPanel() {
  const [result, setResult] = useState(null);

  const callAPI = async (method, url, body = null) => {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null
    });
    setResult(await res.json());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Token Admin Panel</h2>

      <button
        onClick={() =>
          callAPI("GET", "http://127.0.0.1:8000/services/admin/tokens/list")
        }
      >
        List Tokens
      </button>

      <button
        onClick={() =>
          callAPI("POST", "http://127.0.0.1:8000/services/admin/tokens/create", {
            service_name: "v2",
            user_id: 1
          })
        }
      >
        Create V2 Token
      </button>

      <button
        onClick={() =>
          callAPI("POST", "http://127.0.0.1:8000/tokens/validate", {
            token: "paste_token_here"
          })
        }
      >
        Validate Token
      </button>

      <button
        onClick={() =>
          callAPI("POST", "http://127.0.0.1:8000/tokens/revoke", {
            token: "paste_token_here"
          })
        }
      >
        Revoke Token
      </button>

      <pre style={{ marginTop: "20px", background: "#eee", padding: "10px" }}>
        {result && JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}
