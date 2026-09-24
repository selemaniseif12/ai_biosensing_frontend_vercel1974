export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/dashboard/profile">Profile</a></li>
          <li><a href="/dashboard/meetings">Meetings</a></li>
          <li><a href="/dashboard/docs">Documentation</a></li>
          <li><a href="/dashboard/government">Government</a></li>
          <li><a href="/dashboard/settings">Settings</a></li>
        </ul>
      </aside>

      {/* Main content */}
      <main style={{ flexGrow: 1, padding: "20px" }}>
        {children}
      </main>
    </div>
  );
}
