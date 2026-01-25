import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  sampleUsers,
  sampleCategories,
  sampleCourses,
  sampleEnrollments,
} from "../data/sampleData";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Local “database” state
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("lms_users");
    return stored ? JSON.parse(stored) : sampleUsers;
  });

  const [categories, setCategories] = useState(() => {
    const stored = localStorage.getItem("lms_categories");
    return stored ? JSON.parse(stored) : sampleCategories;
  });

  const [courses, setCourses] = useState(() => {
    const stored = localStorage.getItem("lms_courses");
    return stored ? JSON.parse(stored) : sampleCourses;
  });

  const [enrollments, setEnrollments] = useState(() => {
    const stored = localStorage.getItem("lms_enrollments");
    return stored ? JSON.parse(stored) : sampleEnrollments;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("lms_currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  // Persist states
  useEffect(() => {
    localStorage.setItem("lms_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("lms_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("lms_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("lms_enrollments", JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem("lms_currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  // ---------- AUTH ----------
  const login = (username, password, rememberMe) => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) {
      return { ok: false, message: "Invalid username or password." };
    }

    setCurrentUser(found);

    // rememberMe simulation
    if (!rememberMe) {
      // if user doesn't want remember, clear on close = not possible reliably here
      // but we can store anyway and provide logout option
    }

    return { ok: true, message: "Login successful!" };
  };

  const logout = () => {
    setCurrentUser(null);
    return { ok: true };
  };

  const register = (newUser) => {
    const existsEmail = users.some((u) => u.email === newUser.email);
    const existsUsername = users.some((u) => u.username === newUser.username);

    if (existsEmail) return { ok: false, message: "Email already exists." };
    if (existsUsername) return { ok: false, message: "Username already exists." };

    setUsers((prev) => [...prev, { ...newUser, id: `U${Date.now()}` }]);
    return { ok: true, message: "Registered successfully!" };
  };

  // ---------- CATEGORY ----------
  const addCategory = (cat) => {
    setCategories((prev) => [
      ...prev,
      {
        id: `CAT${Math.floor(100 + Math.random() * 900)}`,
        createdAt: new Date().toISOString().slice(0, 10),
        ...cat,
      },
    ]);
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // ---------- COURSE (Mentor) ----------
  const addCourse = (course) => {
    setCourses((prev) => [
      ...prev,
      {
        id: `C${Date.now()}`,
        createdAt: new Date().toISOString().slice(0, 10),
        sections: [],
        assignments: [],
        ...course,
      },
    ]);
  };

  const deleteCourse = (courseId) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
  };

  const addSectionToCourse = (courseId, section) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              sections: [
                ...c.sections,
                { id: `S${Date.now()}`, ...section },
              ],
            }
          : c
      )
    );
  };

  const addAssignmentToCourse = (courseId, assignment) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              assignments: [
                ...c.assignments,
                { id: `A${Date.now()}`, ...assignment },
              ],
            }
          : c
      )
    );
  };

  // ---------- ENROLLMENT ----------
  const enrollCourse = (studentId, courseId) => {
    const already = enrollments.some(
      (e) => e.studentId === studentId && e.courseId === courseId
    );
    if (already) return { ok: false, message: "Already enrolled!" };

    setEnrollments((prev) => [
      ...prev,
      {
        id: `E${Date.now()}`,
        studentId,
        courseId,
        enrolledAt: new Date().toISOString().slice(0, 10),
      },
    ]);

    return { ok: true, message: "Enrollment successful!" };
  };

  const value = useMemo(
    () => ({
      users,
      setUsers,
      categories,
      courses,
      enrollments,
      currentUser,
      login,
      logout,
      register,
      addCategory,
      deleteCategory,
      addCourse,
      deleteCourse,
      addSectionToCourse,
      addAssignmentToCourse,
      enrollCourse,
    }),
    [users, categories, courses, enrollments, currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
