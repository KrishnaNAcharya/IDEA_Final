import React, { useState } from "react";
import { addStudent } from "../api";

const AddStudent = ({ onStudentAdded }) => {
    const [name, setName] = useState("");
    const [usn, setUsn] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addStudent({ name, usn, date });
        onStudentAdded(); // Notify the parent to refresh the list
        setName("");
        setUsn("");
        setDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-100 rounded-lg shadow-lg">
            <div>
                <label className="block text-lg font-medium mb-2">Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input w-full px-4 py-2 border rounded-lg shadow-md"
                    placeholder="Enter name"
                />
            </div>
            <div>
                <label className="block text-lg font-medium mb-2">USN:</label>
                <input
                    type="text"
                    value={usn}
                    onChange={(e) => setUsn(e.target.value)}
                    className="input w-full px-4 py-2 border rounded-lg shadow-md"
                    placeholder="Enter USN"
                />
            </div>
            <div>
                <label className="block text-lg font-medium mb-2">Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input w-full px-4 py-2 border rounded-lg shadow-md"
                />
            </div>
            <button type="submit" className="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md">
                Add Student
            </button>
        </form>
    );
};

export default AddStudent;
