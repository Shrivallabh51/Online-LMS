import React from "react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="container py-4">
      <div className="bg-white shadow-sm rounded p-4">
        <h3 className="fw-bold">Student Dashboard</h3>
        <p className="text-muted">View your enrolled courses and profile.</p>

        <div className="d-flex flex-wrap gap-2 mt-3">
          <Link className="btn btn-primary" to="/student/my-courses">
            My Courses
          </Link>
          <Link className="btn btn-dark" to="/student/profile">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
