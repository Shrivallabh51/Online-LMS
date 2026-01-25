import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import CourseCard from "../components/CourseCard.jsx";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const { courses, categories } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredCourses = useMemo(() => {
    if (!search.trim()) return courses;

    const s = search.toLowerCase();
    return courses.filter((c) => {
      const cat = categories.find((x) => x.id === c.categoryId)?.name || "";
      return (
        c.title.toLowerCase().includes(s) ||
        c.description.toLowerCase().includes(s) ||
        cat.toLowerCase().includes(s)
      );
    });
  }, [search, courses, categories]);

  return (
    <div className="container py-4">
      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <h2 className="fw-bold">Learning Management System</h2>
        <p className="text-muted mb-3">
          Explore trending courses, enroll and learn with mentors.
        </p>

        <div className="row g-2 align-items-center">
          <div className="col-md-9">
            <input
              className="form-control form-control-lg"
              placeholder="Search courses or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-dark btn-lg w-100"
              onClick={() => setSearch("")}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <h4 className="fw-semibold mb-3">Trending & Available Courses</h4>

      <div className="row">
        {filteredCourses.length === 0 ? (
          <p className="text-muted">No courses found.</p>
        ) : (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onView={() => navigate(`/student/course/${course.id}`)}
            />
          ))
        )}
      </div>

      <div className="mt-4 bg-white p-3 rounded shadow-sm">
        <h5 className="fw-bold">Categories</h5>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c.id} className="badge bg-primary p-2">
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
