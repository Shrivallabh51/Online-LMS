import React from "react";

export default function CourseCard({ course, onView }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100 card-hover">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="card-img-top"
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{course.title}</h5>
          <p className="text-muted mb-1">
            Mentor: <b>{course.mentorName}</b>
          </p>
          <p className="small">{course.description}</p>
          <button className="btn btn-primary w-100" onClick={onView}>
            View Course
          </button>
        </div>
      </div>
    </div>
  );
}
