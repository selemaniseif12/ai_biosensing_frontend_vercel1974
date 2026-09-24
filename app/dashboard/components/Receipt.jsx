export default function Receipt({ receipt }) {
  if (!receipt) return null;

  const {
    id,
    amount,
    date,
    description,
    items
  } = receipt;

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
        marginBottom: "12px",
        border: "1px solid #ddd"
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>
        Receipt #{id ?? "N/A"}
      </h3>

      <p>
        <strong>Amount:</strong> ${amount ?? "0.00"}
      </p>

      <p>
        <strong>Date:</strong> {date ?? "Unknown"}
      </p>

      <p>
        <strong>Description:</strong> {description ?? "No description provided"}
      </p>

      {Array.isArray(items) && items.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <strong>Items:</strong>
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
