import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container py-4">
      <div className="bg-white shadow-sm rounded p-4">
        <h3 className="fw-bold">Admin Dashboard</h3>
        <p className="text-muted">Manage categories, users, and mentor courses.</p>

        <div className="d-flex flex-wrap gap-2 mt-3">
          <Link className="btn btn-primary" to="/admin/categories">
            Categories
          </Link>
          <Link className="btn btn-warning" to="/admin/enrolled">
            Enrolled
          </Link>
          <Link className="btn btn-info" to="/admin/users">
            Users
          </Link>
          <Link className="btn btn-dark" to="/admin/profile">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
