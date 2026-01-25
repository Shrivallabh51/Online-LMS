import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminCategories from "./pages/Admin/AdminCategories.jsx";
import AdminEnrolled from "./pages/Admin/AdminEnrolled.jsx";
import AdminUsers from "./pages/Admin/AdminUsers.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";

// Mentor Pages
import MentorDashboard from "./pages/Mentor/MentorDashboard.jsx";
import MentorCourses from "./pages/Mentor/MentorCourses.jsx";
import MentorEnrolled from "./pages/Mentor/MentorEnrolled.jsx";
import MentorProfile from "./pages/Mentor/MentorProfile.jsx";

// Student Pages
import StudentDashboard from "./pages/Student/StudentDashboard.jsx";
import StudentMyCourses from "./pages/Student/StudentMyCourses.jsx";
import StudentCourseDetail from "./pages/Student/StudentCourseDetail.jsx";
import StudentProfile from "./pages/Student/Studentprofile.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/enrolled"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminEnrolled />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        {/* Mentor */}
        <Route
          path="/mentor"
          element={
            <ProtectedRoute allowedRoles={["Mentor"]}>
              <MentorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor/courses"
          element={
            <ProtectedRoute allowedRoles={["Mentor"]}>
              <MentorCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor/enrolled"
          element={
            <ProtectedRoute allowedRoles={["Mentor"]}>
              <MentorEnrolled />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor/profile"
          element={
            <ProtectedRoute allowedRoles={["Mentor"]}>
              <MentorProfile />
            </ProtectedRoute>
          }
        />

        {/* Student */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/my-courses"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <StudentMyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/course/:id"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <StudentCourseDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={["Student"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
