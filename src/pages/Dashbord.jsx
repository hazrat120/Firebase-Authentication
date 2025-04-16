import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea47 0%, #764ba25e 100%)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">MyApp</span>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center mb-4">
                  <img
                    src="https://ui-avatars.com/api/?name=User&background=667eea&color=fff"
                    alt="Profile"
                    className="rounded-circle mb-3"
                    width="100"
                  />
                  <h5 className="fw-bold">Welcome Back!</h5>
                  <p className="text-muted small">user@example.com</p>
                </div>

                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      <i className="bi bi-speedometer2 me-2"></i>
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="bi bi-person me-2"></i>
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="bi bi-gear me-2"></i>
                      Settings
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Dashboard Area */}
          <div className="col-lg-9">
            <div className="row mb-4">
              <div className="col-md-12">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h4 className="fw-bold mb-0">Dashboard Overview</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-2">Total Projects</h6>
                        <h3 className="mb-0">12</h3>
                      </div>
                      <div className="bg-primary bg-opacity-10 p-3 rounded">
                        <i className="bi bi-folder text-primary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-2">Tasks Completed</h6>
                        <h3 className="mb-0">24</h3>
                      </div>
                      <div className="bg-success bg-opacity-10 p-3 rounded">
                        <i className="bi bi-check-circle text-success"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-2">Pending Items</h6>
                        <h3 className="mb-0">5</h3>
                      </div>
                      <div className="bg-warning bg-opacity-10 p-3 rounded">
                        <i className="bi bi-exclamation-triangle text-warning"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0 fw-bold">Recent Activity</h5>
                      <a href="#" className="small">
                        View All
                      </a>
                    </div>

                    <div className="list-group list-group-flush">
                      <div className="list-group-item border-0 px-0 py-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded p-2 me-3">
                            <i className="bi bi-file-earmark-text text-primary"></i>
                          </div>
                          <div>
                            <h6 className="mb-1">New project created</h6>
                            <p className="small text-muted mb-0">2 hours ago</p>
                          </div>
                        </div>
                      </div>

                      <div className="list-group-item border-0 px-0 py-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded p-2 me-3">
                            <i className="bi bi-check-circle text-success"></i>
                          </div>
                          <div>
                            <h6 className="mb-1">Task completed</h6>
                            <p className="small text-muted mb-0">Yesterday</p>
                          </div>
                        </div>
                      </div>

                      <div className="list-group-item border-0 px-0 py-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded p-2 me-3">
                            <i className="bi bi-person-plus text-info"></i>
                          </div>
                          <div>
                            <h6 className="mb-1">New team member</h6>
                            <p className="small text-muted mb-0">2 days ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
