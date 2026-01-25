import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function MentorProfile() {
  const { currentUser, setUsers } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    address: currentUser.address,
    bio: currentUser.bio,
    highestEducation: currentUser.highestEducation,
  });

  const save = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...form } : u))
    );
    localStorage.setItem(
      "lms_currentUser",
      JSON.stringify({ ...currentUser, ...form })
    );
    setEdit(false);
  };

  return (
    <div className="container py-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="fw-bold mb-3">Profile</h4>

        {!edit ? (
          <>
            <p><b>Name:</b> {currentUser.firstName} {currentUser.lastName}</p>
            <p><b>Email:</b> {currentUser.email}</p>
            <p><b>Username:</b> {currentUser.username}</p>
            <p><b>Highest Education:</b> {currentUser.highestEducation}</p>
            <p><b>Address:</b> {currentUser.address}</p>
            <p><b>Bio:</b> {currentUser.bio}</p>

            <button className="btn btn-primary" onClick={() => setEdit(true)}>
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  className="form-control"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  className="form-control"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, lastName: e.target.value }))
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Highest Education</label>
                <input
                  className="form-control"
                  value={form.highestEducation}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, highestEducation: e.target.value }))
                  }
                />
              </div>

              <div className="col-md-6">
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
            </div>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-success" onClick={save}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={() => setEdit(false)}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
