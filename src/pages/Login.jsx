import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
      let errorType = "general";

      switch (error.code) {
        case "auth/wrong-password":
          errorMessage =
            "The password you entered is incorrect. Please try again.";
          errorType = "password";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email address.";
          errorType = "email";
          break;
        case "auth/invalid-email":
          errorMessage =
            "Please enter a valid email address (e.g., user@example.com).";
          errorType = "email";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Too many failed attempts. Please try again later or reset your password.";
          errorType = "general";
          break;
        default:
          errorMessage = error.message;
      }

      setError({ message: errorMessage, type: errorType });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea99 0%, #764ba2a4 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div
              className="card border-0 shadow-lg overflow-hidden"
              style={{
                borderRadius: "15px",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              <div className="row g-0 flex-md-row flex-column">
                {/* Welcome Section (Right Side on desktop) */}
                <div
                  className="col-md-5 d-flex align-items-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eeada 0%, #764ba2ce 100%)",
                    color: "white",
                    padding: "2rem",
                    minHeight: "300px",
                  }}
                >
                  <div>
                    <h2
                      className="mb-3 mb-md-4"
                      style={{ fontSize: "1.75rem" }}
                    >
                      Welcome to my website
                    </h2>
                    <p
                      style={{
                        opacity: 0.95,
                        fontSize: "1rem",
                        lineHeight: "1.6",
                        marginBottom: "2rem",
                      }}
                    >
                      I'm a passionate and detail-oriented individual who
                      thrives on creativity and problem-solving. Whether it's
                      building meaningful digital experiences or exploring new
                      ideas, I bring energy, curiosity, and a commitment to
                      growth in everything I do.
                    </p>
                    <div
                      className="text-center"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      <small>Designed by Hazrat_Ali</small>
                    </div>
                  </div>
                </div>

                {/* Login Form (Left Side on desktop) */}
                <div className="col-md-7">
                  <div className="card-body p-4 p-md-5">
                    <h2
                      className="text-center mb-4 fw-bold"
                      style={{ color: "#4a5568" }}
                    >
                      USER LOGIN
                    </h2>

                    {error && (
                      <div
                        className={`alert d-flex align-items-center ${
                          error.type === "email"
                            ? "alert-warning"
                            : "alert-danger"
                        }`}
                        role="alert"
                        style={{
                          borderRadius: "8px",
                          borderLeft: `4px solid ${
                            error.type === "email" ? "#ffc107" : "#dc3545"
                          }`,
                          padding: "0.75rem 1.25rem",
                        }}
                      >
                        <i
                          className={`bi ${
                            error.type === "email"
                              ? "bi-envelope-exclamation"
                              : "bi-shield-exclamation"
                          } me-2`}
                        ></i>
                        <div>{error.message}</div>
                      </div>
                    )}

                    <form onSubmit={handleLogin}>
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="form-label"
                          style={{ color: "#4a5568", fontWeight: "500" }}
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className={`form-control ${
                            error?.type === "email" ? "is-invalid" : ""
                          }`}
                          style={{
                            border: `1px solid ${
                              error?.type === "email" ? "#ffc107" : "#e2e8f0"
                            }`,
                            borderRadius: "8px",
                            padding: "12px 15px",
                            backgroundColor: "#f8fafc",
                            transition: "all 0.3s ease",
                          }}
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError(null);
                          }}
                          required
                          onFocus={(e) => {
                            e.target.style.borderColor = "#667eea";
                            e.target.style.backgroundColor = "#ffffff";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor =
                              error?.type === "email" ? "#ffc107" : "#e2e8f0";
                            e.target.style.backgroundColor = "#f8fafc";
                          }}
                        />
                      </div>
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
                            className={`form-control ${
                              error?.type === "password" ? "is-invalid" : ""
                            }`}
                            style={{
                              border: `1px solid ${
                                error?.type === "password"
                                  ? "#dc3545"
                                  : "#e2e8f0"
                              }`,
                              borderRadius: "8px",
                              padding: "12px 40px 12px 15px",
                              backgroundColor: "#f8fafc",
                              transition: "all 0.3s ease",
                            }}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setError(null);
                            }}
                            required
                            onFocus={(e) => {
                              e.target.style.borderColor = "#667eea";
                              e.target.style.backgroundColor = "#ffffff";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor =
                                error?.type === "password"
                                  ? "#dc3545"
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
                                showPassword
                                  ? "bi-eye-slash-fill"
                                  : "bi-eye-fill"
                              }`}
                            ></i>
                          </button>
                        </div>
                        {error?.type === "password" && (
                          <div className="mt-2 text-danger small">
                            <i className="bi bi-info-circle me-1"></i>
                            Make sure your CAPS LOCK is off and try again
                          </div>
                        )}
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={{
                              border: "1px solid #cbd5e0",
                              cursor: "pointer",
                              width: "18px",
                              height: "18px",
                            }}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="rememberMe"
                            style={{ color: "#4a5568" }}
                          >
                            Remember me
                          </label>
                        </div>
                        <Link
                          to="/forgot-password"
                          className="text-decoration-none"
                          style={{
                            color: "#667eea",
                            transition: "all 0.3s ease",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.textDecoration = "underline";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.textDecoration = "none";
                          }}
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <button
                        type="submit"
                        className="btn w-100 py-3 fw-bold mb-3"
                        disabled={loading}
                        style={{
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          border: "none",
                          borderRadius: "8px",
                          color: "white",
                          transition: "all 0.3s ease",
                          fontSize: "1rem",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.opacity = "0.9";
                          e.target.style.transform = "translateY(-1px)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.opacity = "1";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Logging in...
                          </>
                        ) : (
                          "LOGIN"
                        )}
                      </button>

                      <div className="text-center mt-3">
                        <span style={{ color: "#718096" }}>
                          Don't have an account?{" "}
                        </span>
                        <Link
                          to="/register"
                          className="text-decoration-none fw-bold"
                          style={{
                            color: "#667eea",
                            transition: "all 0.3s ease",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.textDecoration = "underline";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.textDecoration = "none";
                          }}
                        >
                          Register now
                        </Link>
                      </div>
                    </form>
                  </div>
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
