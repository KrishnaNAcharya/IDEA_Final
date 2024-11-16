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
            const sortedStudents = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setStudents(sortedStudents);
        } catch (error) {
            console.error("Error fetching students", error);
        }
    };

    const handleRemove = async (id) => {
        try {
            console.log("Sending request to remove student with id:", id);
            await removeStudent(id);
            fetchStudents(); // Refresh the list
        } catch (error) {
            console.error("Error removing student", error);
            alert("An error occurred while removing the student");
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
                        <span className="text-lg font-medium">USN: {student.usn}</span>
                        <span className="text-lg text-gray-600">Added on: {new Date(student.date).toLocaleDateString()}</span>
                        <button
                            onClick={() => handleRemove(student.id)}
                            className="btn bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;
