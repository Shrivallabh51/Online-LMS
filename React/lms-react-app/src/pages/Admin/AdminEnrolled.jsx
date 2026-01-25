import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AdminEnrolled() {
  const { courses, categories, deleteCourse } = useContext(AuthContext);

  return (
    <div className="container py-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="fw-bold mb-3">Mentor Added Courses</h4>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Category ID</th>
                <th>Course Name</th>
                <th>Description</th>
                <th>Mentor Name</th>
                <th>Created At</th>
                <th style={{ width: "140px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => {
                const cat = categories.find((x) => x.id === c.categoryId);
                return (
                  <tr key={c.id}>
                    <td>{cat?.id || c.categoryId}</td>
                    <td>{c.title}</td>
                    <td>{c.description}</td>
                    <td>{c.mentorName}</td>
                    <td>{c.createdAt}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteCourse(c.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              {courses.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-muted small">
          Admin can delete courses for moderation.
        </p>
      </div>
    </div>
  );
}
