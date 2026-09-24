"use client";
export const dynamic = "force-dynamic";
export const runtime = "edge";


import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/* Existing Components */
import VirusList from "./components/VirusList.jsx";

/* ML Training */
import MLTrainingV2 from "./components/MLTrainingV2.jsx";
import MLTrainingV6 from "./components/MLTrainingV6.jsx";

/* Home */
import HomePage from "./components/HomePage.jsx";

/* Profile */
import Profile from "./components/profile";

/* Consulting */
import ConsultingPage from "./components/ConsultingPage.jsx";
import ConsultingPaymentHistory from "./components/ConsultingPaymentHistory.jsx";
import ConsultationCalendar from "./components/ConsultationCalendar.jsx";

/* NEW - Consulting Meetings Dashboard */
import MeetingForm from "./components/MeetingForm.jsx";
import MeetingList from "./components/MeetingList.jsx";
import ScheduleCalendar from "./components/ScheduleCalendar.jsx";

/* Enrollment */
import EnrollmentStatus from "./components/EnrollmentStatus.jsx";

/* Course Dashboards */
import CourseDashboard from "./components/CourseDashboard.jsx";
import CourseModulesDashboard from "./components/CourseModulesDashboard.jsx";
import CourseContentDashboard from "./components/CourseContentDashboard.jsx";

/* Student/Admin/Public */
import StudentDashboard from "./components/StudentDashboard.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import PublicDashboard from "./components/PublicDashboard.jsx";

/* ML Models VCE-100 */
import VCE100V2Dashboard from "./components/VCE100V2Dashboard.jsx";
import VCE100V6Dashboard from "./components/VCE100V6Dashboard.jsx";
import VCE100CompareDashboard from "./components/VCE100CompareDashboard.jsx";

/* ML Drift */
import MlDrift from "./components/MlDrift.jsx";

/* Probability vs Flow Rate */
import VirusProbabilityFlowChart from "./components/VirusProbabilityFlowChart.jsx";

/* TOKEN-BASED ACCESS COMPONENTS */
import CourseAccessButton from "./components/CourseAccessButton.jsx";
import VirusAccessButton from "./components/VirusAccessButton.jsx";
import ConsultingAccessButton from "./components/ConsultingAccessButton.jsx";

/* Meetings API */
import { getMeetings } from "./components/MeetingAPI.jsx";

/* ⭐ ADMIN TOKEN DASHBOARD */
import AdminTokenDashboard from "./components/AdminTokenDashboard.jsx";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [openSection, setOpenSection] = useState<string | null>("home");
  // FIX: Proper typing for meetings array
  const [meetings, setMeetings] = useState<any[]>([]);
  const [token, setToken] = useState("");

  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("user_id", "1");
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleCreate = (meeting: any) => {
    const normalized = {
      id: meeting.id || crypto.randomUUID(),
      title: meeting.title || "Consultation Meeting",
      date: meeting.date || "",
      time: meeting.time || "",
      platform: meeting.platform || "N/A",
      link: meeting.link || "",
    };
    setMeetings((current) => [...current, normalized]);
  };

  useEffect(() => {
    getMeetings().then(setMeetings).catch(console.error);
  }, []);

  useEffect(() => {
    const paymentStatus = params.get("payment");
    if (paymentStatus === "success") router.push("/dashboard/payment-success");
    if (paymentStatus === "cancel") router.push("/dashboard/payment-cancel");
  }, [params, router]);

  const pageStyle = {
    padding: "24px",
    maxWidth: "1300px",
    margin: "0 auto",
    minHeight: "100vh",
    lineHeight: "1.5",
  };

  const cardStyle = {
    backgroundColor: "#f9f9f9",
    padding: "18px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    minWidth: "260px",
  };

  const buttonStyle = (isActive: boolean) => ({
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: isActive ? "#0057b8" : "#e0e0e0",
    color: isActive ? "#fff" : "#333",
    cursor: "pointer",
  });

  return (
    <div style={pageStyle}>
      <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>

      {/* TOKEN INPUT */}
      <div style={{ marginBottom: "20px" }}>
        <label>Service Token:</label>
        <input
          type="text"
          placeholder="Enter your token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ marginLeft: "10px", width: "300px" }}
        />
      </div>

      {/* NAVIGATION CARDS */}
      <div
        style={{
          marginBottom: "26px",
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          overflowX: "auto",
          paddingBottom: "10px",
        }}
      >
        {/* HOME */}
        <div style={cardStyle}>
          <h3 onClick={() => toggleSection("home")} style={{ cursor: "pointer" }}>
            Home
          </h3>
          {openSection === "home" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
              <button
                onClick={() => setActiveTab("home")}
                style={buttonStyle(activeTab === "home")}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                style={buttonStyle(activeTab === "profile")}
              >
                Profile
              </button>
            </div>
          )}
        </div>

        {/* MACHINE LEARNING */}
        <div style={cardStyle}>
          <h3 onClick={() => toggleSection("ml")} style={{ cursor: "pointer" }}>
            Machine Learning
          </h3>

          {openSection === "ml" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
              <button
                onClick={() => setActiveTab("ml_v2")}
                style={buttonStyle(activeTab === "ml_v2")}
              >
                ML Training V2
              </button>

              <button
                onClick={() => setActiveTab("ml_v6")}
                style={buttonStyle(activeTab === "ml_v6")}
              >
                ML Training V6
              </button>

              <button
                onClick={() => setActiveTab("ml_drift")}
                style={buttonStyle(activeTab === "ml_drift")}
              >
                ML Drift
              </button>
            </div>
          )}
        </div>

        {/* VIRUS TOOLS */}
        <div style={cardStyle}>
          <h3 onClick={() => toggleSection("virus")} style={{ cursor: "pointer" }}>
            Virus Tools
          </h3>

          {openSection === "virus" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
              <button
                onClick={() => setActiveTab("virus_list")}
                style={buttonStyle(activeTab === "virus_list")}
              >
                Virus List
              </button>

              <button
                onClick={() => setActiveTab("virus_access")}
                style={buttonStyle(activeTab === "virus_access")}
              >
                Virus Access
              </button>
            </div>
          )}
        </div>

        {/* COURSES */}
        <div style={cardStyle}>
          <h3 onClick={() => toggleSection("courses")} style={{ cursor: "pointer" }}>
            Courses
          </h3>
          {openSection === "courses" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
              <button
                onClick={() => setActiveTab("enrollment")}
                style={buttonStyle(activeTab === "enrollment")}
              >
                Enrollment
              </button>
              <button
                onClick={() => setActiveTab("course_dashboard")}
                style={buttonStyle(activeTab === "course_dashboard")}
              >
                Course Dashboard
              </button>
              <button
                onClick={() => setActiveTab("course_modules")}
                style={buttonStyle(activeTab === "course_modules")}
              >
                Course Modules
              </button>
              <button
                onClick={() => setActiveTab("course_content")}
                style={buttonStyle(activeTab === "course_content")}
              >
                Course Content
              </button>
              <button
                onClick={() => setActiveTab("course_access")}
                style={buttonStyle(activeTab === "course_access")}
              >
                Course Access
              </button>
            </div>
          )}
        </div>

        {/* ⭐ PAYMENT HISTORY */}
        <div style={cardStyle}>
          <h3
            onClick={() => router.push("/dashboard/payment-history")}
            style={{ cursor: "pointer", color: "#007bff" }}
          >
            Payment History
          </h3>
        </div>

        {/* CONSULTING */}
        <div style={cardStyle}>
          <h3
            onClick={() => toggleSection("consulting")}
            style={{ cursor: "pointer" }}
          >
            Consulting
          </h3>
          {openSection === "consulting" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
              <button
                onClick={() => setActiveTab("consulting")}
                style={buttonStyle(activeTab === "consulting")}
              >
                Consulting
              </button>
              <button
                onClick={() => setActiveTab("consulting_history")}
                style={buttonStyle(activeTab === "consulting_history")}
              >
                Consulting History
              </button>
              <button
                onClick={() => setActiveTab("consulting_calendar")}
                style={buttonStyle(activeTab === "consulting_calendar")}
              >
                Consultation Calendar
              </button>
              <button
                onClick={() => setActiveTab("consulting_meetings")}
                style={buttonStyle(activeTab === "consulting_meetings")}
              >
                Consulting Meetings
              </button>
              <button
                onClick={() => setActiveTab("consulting_access")}
                style={buttonStyle(activeTab === "consulting_access")}
              >
                Consulting Access
              </button>
            </div>
          )}
        </div>

        {/* ML MODELS VCE-100 */}
        <div style={cardStyle}>
          <h3 onClick={() => toggleSection("vce")} style={{ cursor: "pointer" }}>
            ML Models VCE-100
          </h3>
          {openSection === "vce" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
              <button
                onClick={() => setActiveTab("vce100_v2")}
                style={buttonStyle(activeTab === "vce100_v2")}
              >
                VCE-100 V2
              </button>
              <button
                onClick={() => setActiveTab("vce100_v6")}
                style={buttonStyle(activeTab === "vce100_v6")}
              >
                VCE-100 V6
              </button>
              <button
                onClick={() => setActiveTab("vce100_compare")}
                style={buttonStyle(activeTab === "vce100_compare")}
              >
                VCE-100 Compare
              </button>
            </div>
          )}
        </div>

        {/* ADMIN & SYSTEM */}
        <div style={cardStyle}>
          <h3 onClick={() => toggleSection("admin")} style={{ cursor: "pointer" }}>
            Admin & System
          </h3>
          {openSection === "admin" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
              <button
                onClick={() => setActiveTab("student")}
                style={buttonStyle(activeTab === "student")}
              >
                Student
              </button>
              <button
                onClick={() => setActiveTab("admin")}
                style={buttonStyle(activeTab === "admin")}
              >
                Admin
              </button>
              <button
                onClick={() => setActiveTab("public")}
                style={buttonStyle(activeTab === "public")}
              >
                Public
              </button>

              <button
                onClick={() => setActiveTab("admin_tokens")}
                style={buttonStyle(activeTab === "admin_tokens")}
              >
                Admin Tokens
              </button>

              <button
                onClick={() => router.push("/dashboard/admin/store")}
                style={buttonStyle(false)}
              >
                Store
              </button>
              <button
                onClick={() => router.push("/dashboard/admin/cart")}
                style={buttonStyle(false)}
              >
                Cart
              </button>
              <button
                onClick={() => router.push("/dashboard/admin/checkout")}
                style={buttonStyle(false)}
              >
                Checkout
              </button>
            </div>
          )}
        </div>

        {/* MARKETPLACE */}
        <div style={cardStyle}>
          <h3
            onClick={() => toggleSection("marketplace")}
            style={{ cursor: "pointer", color: "#b8860b" }}
          >
            Marketplace
          </h3>

          {openSection === "marketplace" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
              <button
                onClick={() => router.push("/dashboard/admin/store")}
                style={buttonStyle(false)}
              >
                Store
              </button>

              <button
                onClick={() => router.push("/dashboard/admin/cart")}
                style={buttonStyle(false)}
              >
                Cart
              </button>

              <button
                onClick={() => router.push("/dashboard/admin/checkout")}
                style={buttonStyle(false)}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div style={{ marginTop: "18px" }}>
        {activeTab === "home" && <HomePage data={null} />}
        {activeTab === "profile" && <Profile />}

        {/* VIRUS LIST */}
        {activeTab === "virus_list" &&
          (token ? (
            <VirusList />
          ) : (
            <div style={{ color: "red" }}>Token required</div>
          ))}

        {/* MACHINE LEARNING */}
        {activeTab === "ml_v2" && <MLTrainingV2 />}
        {activeTab === "ml_v6" && <MLTrainingV6 />}

        {/* CONSULTING */}
        {activeTab === "consulting" && <ConsultingPage />}
        {activeTab === "consulting_history" && <ConsultingPaymentHistory />}
        {activeTab === "consulting_calendar" && <ConsultationCalendar />}

        {/* COURSES */}
        {activeTab === "enrollment" && <EnrollmentStatus />}
        {activeTab === "course_dashboard" && <CourseDashboard />}
        {activeTab === "course_modules" && <CourseModulesDashboard />}
        {activeTab === "course_content" && <CourseContentDashboard />}

        {/* STUDENT / ADMIN / PUBLIC */}
        {activeTab === "student" && <StudentDashboard />}
        {activeTab === "admin" && <AdminDashboard />}
        {activeTab === "public" && <PublicDashboard />}

        {/* ML MODELS */}
        {activeTab === "vce100_v2" && <VCE100V2Dashboard />}
        {activeTab === "vce100_v6" && <VCE100V6Dashboard />}
        {activeTab === "vce100_compare" && <VCE100CompareDashboard />}

        {/* ML DRIFT */}
        {activeTab === "ml_drift" && <MlDrift />}

        {/* VIRUS PROBABILITY FLOW */}
        {activeTab === "prob_flow" && <VirusProbabilityFlowChart />}

        {/* COURSE ACCESS */}
        {activeTab === "course_access" && (
          <CourseAccessButton courseId="1" userId={1} />
        )}

        {/* VIRUS ACCESS */}
        {activeTab === "virus_access" && (
          <VirusAccessButton userId={1} token={token} />
        )}

        {/* CONSULTING MEETINGS */}
        {activeTab === "consulting_meetings" && (
          <div>
            <MeetingForm onCreate={handleCreate} />
            <MeetingList meetings={meetings} />
            <ScheduleCalendar meetings={meetings} />
          </div>
        )}

        {/* CONSULTING ACCESS */}
        {activeTab === "consulting_access" && (
          <ConsultingAccessButton consultingService="consulting" userId={1} />
        )}

        {/* ADMIN TOKEN DASHBOARD */}
        {activeTab === "admin_tokens" && <AdminTokenDashboard />}
      </div>
    </div>
  );
}
