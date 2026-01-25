import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ToastMsg from "../../components/ToastMsg";

export default function StudentCourseDetail() {
  const { id } = useParams();
  const { courses, enrollments, currentUser, enrollCourse } =
    useContext(AuthContext);

  const course = useMemo(() => courses.find((c) => c.id === id), [courses, id]);

  const isEnrolled = useMemo(() => {
    return enrollments.some(
      (e) => e.studentId === currentUser?.id && e.courseId === id
    );
  }, [enrollments, currentUser, id]);

  const [msg, setMsg] = useState("");
  const [type, setType] = useState("success");

  if (!course) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Course not found.</div>
      </div>
    );
  }

  const handleEnroll = () => {
    const res = enrollCourse(currentUser.id, course.id);
    if (!res.ok) {
      setType("danger");
      setMsg(res.message);
    } else {
      setType("success");
      setMsg(res.message);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="card-img-top"
          style={{ height: "320px", objectFit: "cover" }}
        />
        <div className="card-body p-4">
          <h3 className="fw-bold">{course.title}</h3>
          <p className="text-muted mb-1">
            Mentor: <b>{course.mentorName}</b>
          </p>
          <p>{course.description}</p>

          {!isEnrolled ? (
            <button className="btn btn-success" onClick={handleEnroll}>
              Enroll Now
            </button>
          ) : (
            <span className="badge bg-success p-2">Enrolled ✅</span>
          )}

          <ToastMsg type={type} message={msg} />

          <hr />

          <h5 className="fw-bold">Sections</h5>
          {!isEnrolled ? (
            <p className="text-muted">
              Enroll to access full sections and assignments.
            </p>
          ) : (
            <div className="accordion" id="sectionsAcc">
              {course.sections.length === 0 ? (
                <p className="text-muted">No sections available.</p>
              ) : (
                course.sections.map((s, idx) => (
                  <div className="accordion-item" key={s.id}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${idx !== 0 ? "collapsed" : ""}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#sec_${s.id}`}
                      >
                        {s.title}
                      </button>
                    </h2>
                    <div
                      id={`sec_${s.id}`}
                      className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
                      data-bs-parent="#sectionsAcc"
                    >
                      <div className="accordion-body">{s.content}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <hr />

          <h5 className="fw-bold">Assignments</h5>
          {!isEnrolled ? (
            <p className="text-muted">Enroll to access assignments.</p>
          ) : course.assignments.length === 0 ? (
            <p className="text-muted">No assignments available.</p>
          ) : (
            <ul className="list-group">
              {course.assignments.map((a) => (
                <li key={a.id} className="list-group-item">
                  <b>{a.title}</b> | Due: {a.dueDate || "N/A"} | Marks: {a.marks}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
