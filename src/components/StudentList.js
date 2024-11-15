// src/components/StudentList.js
import React, { useState, useEffect } from "react";
import { getStudents, removeStudent } from "../api";
import AddStudent from "./AddStudent";
import { Link } from "react-router-dom";

const StudentList = () => {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const response = await getStudents();
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students", error);
        }
    };

    const handleRemove = async (id) => {
        try {
            await removeStudent(id);
            fetchStudents(); // Refresh the list
        } catch (error) {
            console.error("Error removing student", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="space-y-6 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-600">Student List</h2>
            <AddStudent onStudentAdded={fetchStudents} />
            <ul className="space-y-4">
                {students.map((student) => (
                    <li key={student.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
                        <span className="text-lg font-medium">{student.name}</span>
                        <div className="space-x-4">
                            <Link to={`/attendance/${student.id}`} className="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md">
                                View Attendance
                            </Link>
                            <button
                                onClick={() => handleRemove(student.id)}
                                className="btn bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;
