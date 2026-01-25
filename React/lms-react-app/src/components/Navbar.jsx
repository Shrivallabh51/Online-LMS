import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand fw-bold" to="/">
        LMS
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="nav">
        <ul className="navbar-nav ms-auto">
          {!currentUser ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-warning ms-2" to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <span className="nav-link text-white">
                  Role: <b>{currentUser.role}</b>
                </span>
              </li>

              <li className="nav-item">
                {currentUser.role === "Admin" && (
                  <Link className="btn btn-success ms-2" to="/admin">
                    Dashboard
                  </Link>
                )}
                {currentUser.role === "Mentor" && (
                  <Link className="btn btn-success ms-2" to="/mentor">
                    Dashboard
                  </Link>
                )}
                {currentUser.role === "Student" && (
                  <Link className="btn btn-success ms-2" to="/student">
                    Dashboard
                  </Link>
                )}
              </li>

              <li className="nav-item">
                <button className="btn btn-danger ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
