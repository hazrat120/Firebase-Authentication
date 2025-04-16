import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                  Create Account
                </h2>
                <form onSubmit={handleRegister}>
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

                  {/* Password Field with Toggle */}
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="form-label"
                      style={{ color: "#4a5568", fontWeight: "500" }}
                    >
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        style={{
                          border: `1px solid ${
                            passwordError ? "#e53e3e" : "#e2e8f0"
                          }`,
                          borderRadius: "8px",
                          padding: "12px 40px 12px 15px",
                          backgroundColor: "#f8fafc",
                          transition: "all 0.3s ease",
                        }}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (
                            confirmPassword &&
                            e.target.value !== confirmPassword
                          ) {
                            setPasswordError("Passwords do not match");
                          } else {
                            setPasswordError("");
                          }
                        }}
                        required
                        onFocus={(e) => {
                          e.target.style.borderColor = "#667eea";
                          e.target.style.backgroundColor = "#ffffff";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = passwordError
                            ? "#e53e3e"
                            : "#e2e8f0";
                          e.target.style.backgroundColor = "#f8fafc";
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3"
                        onClick={togglePasswordVisibility}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#718096",
                          padding: "0",
                          zIndex: 5,
                        }}
                      >
                        <i
                          className={`bi ${
                            showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field with Toggle */}
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label"
                      style={{ color: "#4a5568", fontWeight: "500" }}
                    >
                      Confirm Password
                    </label>
                    <div className="position-relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        style={{
                          border: `1px solid ${
                            passwordError ? "#e53e3e" : "#e2e8f0"
                          }`,
                          borderRadius: "8px",
                          padding: "12px 40px 12px 15px",
                          backgroundColor: "#f8fafc",
                          transition: "all 0.3s ease",
                        }}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (password !== e.target.value) {
                            setPasswordError("Passwords do not match");
                          } else {
                            setPasswordError("");
                          }
                        }}
                        required
                        onFocus={(e) => {
                          e.target.style.borderColor = "#667eea";
                          e.target.style.backgroundColor = "#ffffff";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = passwordError
                            ? "#e53e3e"
                            : "#e2e8f0";
                          e.target.style.backgroundColor = "#f8fafc";
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3"
                        onClick={toggleConfirmPasswordVisibility}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#718096",
                          padding: "0",
                          zIndex: 5,
                        }}
                      >
                        <i
                          className={`bi ${
                            showConfirmPassword
                              ? "bi-eye-slash-fill"
                              : "bi-eye-fill"
                          }`}
                        ></i>
                      </button>
                    </div>
                    {passwordError && (
                      <div
                        className="text-danger mt-2"
                        style={{ fontSize: "0.875rem" }}
                      >
                        <i className="bi bi-exclamation-circle-fill me-1"></i>
                        {passwordError}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 py-3 fw-bold"
                    disabled={loading || passwordError}
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      transition: "all 0.3s ease",
                      fontSize: "1rem",
                      opacity: loading || passwordError ? 0.7 : 1,
                      cursor:
                        loading || passwordError ? "not-allowed" : "pointer",
                    }}
                    onMouseOver={(e) => {
                      if (!loading && !passwordError) {
                        e.target.style.opacity = "0.9";
                        e.target.style.transform = "translateY(-1px)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!loading && !passwordError) {
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
                        Creating Account...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>
                <div className="mt-4 text-center" style={{ color: "#718096" }}>
                  Already have an account?{" "}
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

      {/* Bootstrap Icons */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
      />
    </div>
  );
}
