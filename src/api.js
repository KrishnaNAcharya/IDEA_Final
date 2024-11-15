import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",  // Ensure this URL is correct and the server is running
});

// Fetch all students
export const getStudents = () => api.get("/students");

// Add a new student
export const addStudent = (data) => api.post("/students", data);

// Remove a student
export const removeStudent = (id) => api.delete(`/students/${id}`);

// Mark attendance for a student
export const markAttendance = (data) => api.post("/attendance", data);

// Get attendance for a specific student
export const getAttendance = (studentId) => api.get(`/attendance/${studentId}`);

export default api;
