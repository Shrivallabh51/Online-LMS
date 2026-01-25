import React, { useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function MentorEnrolled() {
  const { currentUser, enrollments, courses, users } = useContext(AuthContext);

  const myCourseIds = useMemo(() => {
    return courses
      .filter((c) => c.mentorId === currentUser.id)
      .map((c) => c.id);
  }, [courses, currentUser]);

  const enrolledRows = useMemo(() => {
    return enrollments
      .filter((e) => myCourseIds.includes(e.courseId))
      .map((e) => {
        const student = users.find((u) => u.id === e.studentId);
        const course = courses.find((c) => c.id === e.courseId);
        return {
          ...e,
          studentName: student ? `${student.firstName} ${student.lastName}` : "N/A",
          courseTitle: course?.title || "N/A",
        };
      });
  }, [enrollments, myCourseIds, users, courses]);

  return (
    <div className="container py-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="fw-bold mb-3">Enrolled Students</h4>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Enrollment ID</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Enrolled At</th>
              </tr>
            </thead>
            <tbody>
              {enrolledRows.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.studentName}</td>
                  <td>{r.courseTitle}</td>
                  <td>{r.enrolledAt}</td>
                </tr>
              ))}
              {enrolledRows.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No students enrolled yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
