import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastMsg from "../components/ToastMsg.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      setMsg("Username and Password are required.");
      return;
    }

    const res = login(form.username, form.password, form.rememberMe);
    if (!res.ok) {
      setMsg(res.message);
      return;
    }

    setMsg("");

    // redirect by role
    const role = currentUser?.role;
    // Note: currentUser updates async; safest:
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem("lms_currentUser"));
      if (!stored) return navigate("/");

      if (stored.role === "Admin") navigate("/admin");
      else if (stored.role === "Mentor") navigate("/mentor");
      else navigate("/student");
    }, 100);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-2">Login</h3>
              <p className="text-muted">
                Use sample accounts: <br />
                <b>admin / Admin@123</b> <br />
                <b>mentor / Mentor@123</b> <br />
                <b>student / Student@123</b>
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    value={form.username}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, username: e.target.value }))
                    }
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={form.rememberMe}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, rememberMe: e.target.checked }))
                      }
                    />
                    <label className="form-check-label">Remember Me</label>
                  </div>

                  <Link to="/forgot-password" className="text-decoration-none">
                    Forget Password?
                  </Link>
                </div>

                <button className="btn btn-primary w-100">Login</button>
              </form>

              <ToastMsg type="danger" message={msg} />

              <div className="mt-3 text-center">
                <Link to="/register" className="text-decoration-none">
                  Not a user? Create an account
                </Link>
              </div>
            </div>
          </div>

          <div className="small text-muted mt-3">
            Note: This is a frontend-only demo. Data is stored in LocalStorage.
          </div>
        </div>
      </div>
    </div>
  );
}
