import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eeada 0%, #764ba2ce 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div
              className="card shadow-lg border-0"
              style={{
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              <div className="card-body p-5">
                <h2
                  className="text-center mb-4 fw-bold"
                  style={{ color: "#4a5568" }}
                >
                  Reset Your Password
                </h2>
                <p className="text-center mb-4" style={{ color: "#718096" }}>
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
                <form onSubmit={handleReset}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="form-label"
                      style={{ color: "#4a5568", fontWeight: "500" }}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "12px 15px",
                        backgroundColor: "#f8fafc",
                        transition: "all 0.3s ease",
                      }}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.backgroundColor = "#ffffff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.backgroundColor = "#f8fafc";
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn w-100 py-3 fw-bold"
                    disabled={loading}
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      transition: "all 0.3s ease",
                      fontSize: "1rem",
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    onMouseOver={(e) => {
                      if (!loading) {
                        e.target.style.opacity = "0.9";
                        e.target.style.transform = "translateY(-1px)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!loading) {
                        e.target.style.opacity = "1";
                        e.target.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Sending Reset Link...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>
                <div className="mt-4 text-center" style={{ color: "#718096" }}>
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-none fw-bold"
                    style={{ color: "#667eea", transition: "all 0.3s ease" }}
                    onMouseOver={(e) => {
                      e.target.style.textDecoration = "underline";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.textDecoration = "none";
                    }}
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
