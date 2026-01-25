import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AdminUsers() {
  const { users, setUsers } = useContext(AuthContext);
  const [viewRole, setViewRole] = useState("Student");

  const filtered = useMemo(() => {
    return users.filter((u) => u.role === viewRole);
  }, [users, viewRole]);

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="container py-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h4 className="fw-bold mb-0">Users</h4>
          <select
            className="form-select"
            style={{ width: "200px" }}
            value={viewRole}
            onChange={(e) => setViewRole(e.target.value)}
          >
            <option value="Student">View Students</option>
            <option value="Mentor">View Mentors</option>
            <option value="Admin">View Admins</option>
          </select>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>User ID</th>
                <th>Role</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Mobile</th>
                <th style={{ width: "140px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.role}</td>
                  <td>
                    {u.firstName} {u.lastName}
                  </td>
                  <td>{u.email}</td>
                  <td>{u.username}</td>
                  <td>{u.mobile}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-muted small">
          Edit feature can be added using a Bootstrap Modal.
        </p>
      </div>
    </div>
  );
}
