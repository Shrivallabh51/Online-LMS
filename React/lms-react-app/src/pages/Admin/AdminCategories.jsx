import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function AdminCategories() {
  const { categories, addCategory, deleteCategory } = useContext(AuthContext);

  const [newCat, setNewCat] = useState({
    name: "",
    description: "",
  });

  const handleAdd = () => {
    if (!newCat.name.trim()) return;
    addCategory(newCat);
    setNewCat({ name: "", description: "" });
  };

  return (
    <div className="container py-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="fw-bold mb-3">Categories</h4>

        <div className="row g-2 mb-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Category Name"
              value={newCat.name}
              onChange={(e) => setNewCat((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Description"
              value={newCat.description}
              onChange={(e) =>
                setNewCat((p) => ({ ...p, description: e.target.value }))
              }
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Category ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Created At</th>
                <th style={{ width: "140px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>{c.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteCategory(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No categories available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-muted small">
          Note: Edit is skipped in demo. You can add easily using a modal.
        </p>
      </div>
    </div>
  );
}
