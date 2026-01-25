import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ToastMsg from "../../components/ToastMsg";

export default function MentorCourses() {
  const {
    currentUser,
    categories,
    courses,
    addCourse,
    addSectionToCourse,
    addAssignmentToCourse,
    deleteCourse,
  } = useContext(AuthContext);

  const myCourses = useMemo(() => {
    return courses.filter((c) => c.mentorId === currentUser.id);
  }, [courses, currentUser]);

  const [msg, setMsg] = useState("");
  const [type, setType] = useState("success");

  const [courseForm, setCourseForm] = useState({
    categoryId: categories[0]?.id || "",
    title: "",
    description: "",
    thumbnail:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    notes: "",
  });

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!courseForm.title.trim() || !courseForm.description.trim()) {
      setType("danger");
      setMsg("Title and Description are required.");
      return;
    }

    addCourse({
      ...courseForm,
      mentorId: currentUser.id,
      mentorName: `${currentUser.firstName} ${currentUser.lastName}`,
    });

    setType("success");
    setMsg("Course added successfully!");
    setCourseForm((p) => ({ ...p, title: "", description: "", notes: "" }));
  };

  const [sectionForm, setSectionForm] = useState({
    courseId: "",
    title: "",
    content: "",
  });

  const [assignmentForm, setAssignmentForm] = useState({
    courseId: "",
    title: "",
    dueDate: "",
    marks: "",
  });

  const addSection = () => {
    if (!sectionForm.courseId || !sectionForm.title.trim()) return;
    addSectionToCourse(sectionForm.courseId, {
      title: sectionForm.title,
      content: sectionForm.content,
    });
    setSectionForm({ courseId: "", title: "", content: "" });
    setType("success");
    setMsg("Section added.");
  };

  const addAssignment = () => {
    if (!assignmentForm.courseId || !assignmentForm.title.trim()) return;
    addAssignmentToCourse(assignmentForm.courseId, {
      title: assignmentForm.title,
      dueDate: assignmentForm.dueDate,
      marks: Number(assignmentForm.marks || 0),
    });
    setAssignmentForm({ courseId: "", title: "", dueDate: "", marks: "" });
    setType("success");
    setMsg("Assignment added.");
  };

  return (
    <div className="container py-4">
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h4 className="fw-bold mb-3">Courses</h4>

        <div className="row g-4">
          {/* Add Course */}
          <div className="col-md-6">
            <div className="border rounded p-3">
              <h5 className="fw-semibold">Add Course</h5>
              <form onSubmit={handleAddCourse}>
                <label className="form-label mt-2">Category</label>
                <select
                  className="form-select"
                  value={courseForm.categoryId}
                  onChange={(e) =>
                    setCourseForm((p) => ({ ...p, categoryId: e.target.value }))
                  }
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <label className="form-label mt-2">Title</label>
                <input
                  className="form-control"
                  value={courseForm.title}
                  onChange={(e) =>
                    setCourseForm((p) => ({ ...p, title: e.target.value }))
                  }
                />

                <label className="form-label mt-2">Description</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={courseForm.description}
                  onChange={(e) =>
                    setCourseForm((p) => ({ ...p, description: e.target.value }))
                  }
                />

                <label className="form-label mt-2">Thumbnail URL</label>
                <input
                  className="form-control"
                  value={courseForm.thumbnail}
                  onChange={(e) =>
                    setCourseForm((p) => ({ ...p, thumbnail: e.target.value }))
                  }
                />

                <label className="form-label mt-2">Extra Notes</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={courseForm.notes}
                  onChange={(e) =>
                    setCourseForm((p) => ({ ...p, notes: e.target.value }))
                  }
                />

                <button className="btn btn-success w-100 mt-3">
                  Add Course
                </button>
              </form>
            </div>
          </div>

          {/* Add Section + Assignment */}
          <div className="col-md-6">
            <div className="border rounded p-3 mb-3">
              <h5 className="fw-semibold">Add Section</h5>

              <select
                className="form-select mb-2"
                value={sectionForm.courseId}
                onChange={(e) =>
                  setSectionForm((p) => ({ ...p, courseId: e.target.value }))
                }
              >
                <option value="">Select Course</option>
                {myCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>

              <input
                className="form-control mb-2"
                placeholder="Section Title"
                value={sectionForm.title}
                onChange={(e) =>
                  setSectionForm((p) => ({ ...p, title: e.target.value }))
                }
              />

              <textarea
                className="form-control mb-2"
                rows="2"
                placeholder="Section Content"
                value={sectionForm.content}
                onChange={(e) =>
                  setSectionForm((p) => ({ ...p, content: e.target.value }))
                }
              />

              <button className="btn btn-primary w-100" onClick={addSection}>
                Add Section
              </button>
            </div>

            <div className="border rounded p-3">
              <h5 className="fw-semibold">Add Assignment</h5>

              <select
                className="form-select mb-2"
                value={assignmentForm.courseId}
                onChange={(e) =>
                  setAssignmentForm((p) => ({ ...p, courseId: e.target.value }))
                }
              >
                <option value="">Select Course</option>
                {myCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>

              <input
                className="form-control mb-2"
                placeholder="Assignment Title"
                value={assignmentForm.title}
                onChange={(e) =>
                  setAssignmentForm((p) => ({ ...p, title: e.target.value }))
                }
              />

              <div className="row g-2">
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    value={assignmentForm.dueDate}
                    onChange={(e) =>
                      setAssignmentForm((p) => ({ ...p, dueDate: e.target.value }))
                    }
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Marks"
                    value={assignmentForm.marks}
                    onChange={(e) =>
                      setAssignmentForm((p) => ({ ...p, marks: e.target.value }))
                    }
                  />
                </div>
              </div>

              <button className="btn btn-dark w-100 mt-2" onClick={addAssignment}>
                Add Assignment
              </button>
            </div>
          </div>
        </div>

        <ToastMsg type={type} message={msg} />
      </div>

      {/* View Courses */}
      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="fw-bold mb-3">View My Courses</h4>

        <div className="row">
          {myCourses.length === 0 ? (
            <p className="text-muted">No courses created yet.</p>
          ) : (
            myCourses.map((c) => (
              <div key={c.id} className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    style={{ height: "200px", objectFit: "cover" }}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="fw-bold">{c.title}</h5>
                    <p className="text-muted">{c.description}</p>
                    <p className="small">
                      <b>Notes:</b> {c.notes || "N/A"}
                    </p>

                    <div className="mt-2">
                      <b>Sections:</b>
                      <ul className="small">
                        {c.sections.map((s) => (
                          <li key={s.id}>
                            {s.title} - {s.content}
                          </li>
                        ))}
                        {c.sections.length === 0 && (
                          <li className="text-muted">No sections added.</li>
                        )}
                      </ul>
                    </div>

                    <div className="mt-2">
                      <b>Assignments:</b>
                      <ul className="small">
                        {c.assignments.map((a) => (
                          <li key={a.id}>
                            {a.title} | Due: {a.dueDate || "N/A"} | Marks:{" "}
                            {a.marks}
                          </li>
                        ))}
                        {c.assignments.length === 0 && (
                          <li className="text-muted">No assignments added.</li>
                        )}
                      </ul>
                    </div>

                    <button
                      className="btn btn-danger w-100 mt-2"
                      onClick={() => deleteCourse(c.id)}
                    >
                      Delete Course
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
