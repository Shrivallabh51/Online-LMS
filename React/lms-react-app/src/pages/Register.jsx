import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastMsg from "../components/ToastMsg.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    role: "Student",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    mobile: "",
    password: "",
    dob: "",
    address: "",
    bio: "",
    highestEducation: "",
  });

  const [msg, setMsg] = useState("");
  const [type, setType] = useState("danger");

  const emailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  }, [form.email]);

  const passwordValid = useMemo(() => {
    // Minimum 8 chars, uppercase, lowercase, number, special char
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(form.password);
  }, [form.password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic required validation
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.username ||
      !form.mobile ||
      !form.password
    ) {
      setType("danger");
      setMsg("Please fill all required fields.");
      return;
    }

    if (!emailValid) {
      setType("danger");
      setMsg("Invalid email format.");
      return;
    }

    if (!passwordValid) {
      setType("danger");
      setMsg(
        "Password must be 8+ chars, include uppercase, lowercase, number and special symbol."
      );
      return;
    }

    if (form.role === "Mentor" && !form.highestEducation.trim()) {
      setType("danger");
      setMsg("Highest Education is required for Mentor.");
      return;
    }

    const res = register(form);
    if (!res.ok) {
      setType("danger");
      setMsg(res.message);
      return;
    }

    setType("success");
    setMsg("Signup successful! Redirecting to Login...");
    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-2">Create Account</h3>
              <p className="text-muted">
                Fill details below to register in LMS.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={form.role}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, role: e.target.value }))
                      }
                    >
                      <option>Admin</option>
                      <option>Mentor</option>
                      <option>Student</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">First Name *</label>
                    <input
                      className="form-control"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, firstName: e.target.value }))
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Last Name *</label>
                    <input
                      className="form-control"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, lastName: e.target.value }))
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      className="form-control"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                    />
                    {!emailValid && form.email && (
                      <small className="text-danger">
                        Email format is invalid
                      </small>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Username *</label>
                    <input
                      className="form-control"
                      value={form.username}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, username: e.target.value }))
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Mobile No *</label>
                    <input
                      className="form-control"
                      value={form.mobile}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, mobile: e.target.value }))
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Password *</label>
                    <div className="input-group">
                      <input
                        type={showPass ? "text" : "password"}
                        className="form-control"
                        value={form.password}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, password: e.target.value }))
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPass((p) => !p)}
                        title="Show/Hide Password"
                      >
                        👁
                      </button>
                    </div>
                    {form.password && !passwordValid && (
                      <small className="text-danger">
                        Password must be strong (8+, Upper, Lower, Number,
                        Symbol)
                      </small>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      value={form.dob}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, dob: e.target.value }))
                      }
                    />
                  </div>

                  <div className="col-md-8">
                    <label className="form-label">Address</label>
                    <input
                      className="form-control"
                      value={form.address}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, address: e.target.value }))
                      }
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={form.bio}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, bio: e.target.value }))
                      }
                    />
                  </div>

                  {form.role === "Mentor" && (
                    <div className="col-md-6">
                      <label className="form-label">Highest Education *</label>
                      <input
                        className="form-control"
                        value={form.highestEducation}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            highestEducation: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}
                </div>

                <button className="btn btn-success w-100 mt-4">
                  Sign Up
                </button>
              </form>

              <ToastMsg type={type} message={msg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
