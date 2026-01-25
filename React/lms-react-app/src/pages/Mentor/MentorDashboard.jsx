import React from "react";
import { Link } from "react-router-dom";

export default function MentorDashboard() {
  return (
    <div className="container py-4">
      <div className="bg-white shadow-sm rounded p-4">
        <h3 className="fw-bold">Mentor Dashboard</h3>
        <p className="text-muted">
          Add courses, create sections and assignments, track enrolled students.
        </p>

        <div className="d-flex flex-wrap gap-2 mt-3">
          <Link className="btn btn-primary" to="/mentor/courses">
            Courses
          </Link>
          <Link className="btn btn-warning" to="/mentor/enrolled">
            Enrolled
          </Link>
          <Link className="btn btn-dark" to="/mentor/profile">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
