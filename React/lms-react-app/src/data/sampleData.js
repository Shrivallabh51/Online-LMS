// Sample data acts like a small "database" for UI simulation

export const sampleCategories = [
  {
    id: "CAT101",
    name: "Web Development",
    description: "Frontend + Backend + Full Stack Learning",
    createdAt: "2026-01-01",
  },
  {
    id: "CAT102",
    name: "Data Science",
    description: "Machine Learning and Data Analysis",
    createdAt: "2026-01-03",
  },
  {
    id: "CAT103",
    name: "UI/UX Design",
    description: "User friendly design and prototypes",
    createdAt: "2026-01-07",
  },
];

export const sampleUsers = [
  {
    id: "U001",
    role: "Admin",
    firstName: "System",
    lastName: "Admin",
    username: "admin",
    password: "Admin@123",
    email: "admin@lms.com",
    mobile: "9999999999",
    dob: "2000-01-01",
    address: "LMS HQ",
    bio: "I manage the platform.",
    highestEducation: "",
  },
  {
    id: "U002",
    role: "Mentor",
    firstName: "Rahul",
    lastName: "Sharma",
    username: "mentor",
    password: "Mentor@123",
    email: "mentor@lms.com",
    mobile: "8888888888",
    dob: "1998-02-10",
    address: "Pune",
    bio: "I teach web development.",
    highestEducation: "M.Tech",
  },
  {
    id: "U003",
    role: "Student",
    firstName: "Ash",
    lastName: "Jadhav",
    username: "student",
    password: "Student@123",
    email: "student@lms.com",
    mobile: "7777777777",
    dob: "2002-04-05",
    address: "Mumbai",
    bio: "I am learning to become a Full Stack Developer.",
    highestEducation: "",
  },
];

export const sampleCourses = [
  {
    id: "C001",
    categoryId: "CAT101",
    title: "React Masterclass with Projects",
    description: "Learn React, Hooks, Components, Routing, and build real projects.",
    mentorId: "U002",
    mentorName: "Rahul Sharma",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    createdAt: "2026-01-10",
    notes: "Includes mini projects + final LMS project.",
    sections: [
      {
        id: "S1",
        title: "React Basics",
        content: "JSX, Components, Props, State",
      },
      {
        id: "S2",
        title: "Routing & Forms",
        content: "React Router + Forms + Validation",
      },
    ],
    assignments: [
      {
        id: "A1",
        title: "Create a Signup Page",
        dueDate: "2026-02-01",
        marks: 20,
      },
    ],
  },
  {
    id: "C002",
    categoryId: "CAT102",
    title: "Intro to Machine Learning",
    description: "Start with ML basics, regression, and practical datasets.",
    mentorId: "U002",
    mentorName: "Rahul Sharma",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80",
    createdAt: "2026-01-12",
    notes: "Python + ML fundamentals explained simply.",
    sections: [
      {
        id: "S1",
        title: "ML Overview",
        content: "Supervised vs Unsupervised learning",
      },
    ],
    assignments: [],
  },
];

// Student enrollments simulation
export const sampleEnrollments = [
  {
    id: "E001",
    studentId: "U003",
    courseId: "C001",
    enrolledAt: "2026-01-15",
  },
];
