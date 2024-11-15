import React, { useState } from "react";
import { addStudent } from "../api";

const AddStudent = ({ onStudentAdded }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addStudent({ name, email });
        onStudentAdded(); // Notify the parent to refresh the list
        setName("");
        setEmail("");
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
                <label className="block text-lg font-medium mb-2">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input w-full px-4 py-2 border rounded-lg shadow-md"
                    placeholder="Enter email"
                />
            </div>
            <button type="submit" className="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md">
                Add Student
            </button>
        </form>
    );
};

export default AddStudent;
