import React, { useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function StudentMyCourses() {
  const { currentUser, courses, enrollments } = useContext(AuthContext);
  const navigate = useNavigate();

  const myCourseIds = useMemo(() => {
    return enrollments
      .filter((e) => e.studentId === currentUser.id)
      .map((e) => e.courseId);
  }, [enrollments, currentUser]);

  const myCourses = useMemo(() => {
    return courses.filter((c) => myCourseIds.includes(c.id));
  }, [courses, myCourseIds]);

  return (
    <div className="container py-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="fw-bold mb-3">My Courses</h4>

        <div className="row">
          {myCourses.length === 0 ? (
            <p className="text-muted">
              You have not enrolled in any course yet.
            </p>
          ) : (
            myCourses.map((c) => (
              <div className="col-md-6 mb-4" key={c.id}>
                <div className="card shadow-sm">
                  <img
                    src={c.thumbnail}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                    alt={c.title}
                  />
                  <div className="card-body">
                    <h5 className="fw-bold">{c.title}</h5>
                    <p className="text-muted">{c.description}</p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => navigate(`/student/course/${c.id}`)}
                    >
                      Open Course
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
