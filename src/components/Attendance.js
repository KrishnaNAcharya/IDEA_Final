import React, { useState, useEffect } from "react";
import { getAttendance, markAttendance } from "../api";
import { useParams } from "react-router-dom";

const Attendance = () => {
    const { studentId } = useParams();
    const [attendance, setAttendance] = useState([]);
    const [status, setStatus] = useState("Present");
    const [date, setDate] = useState("");

    const fetchAttendance = async () => {
        try {
            const response = await getAttendance(studentId);
            const sortedAttendance = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setAttendance(sortedAttendance);
        } catch (error) {
            console.error("Error fetching attendance", error);
        }
    };

    const handleMarkAttendance = async (e) => {
        e.preventDefault();
        try {
            await markAttendance({ student_id: studentId, date, status });
            setDate(""); // Reset date after submission
            fetchAttendance(); // Refresh attendance list
        } catch (error) {
            console.error("Error marking attendance", error);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [studentId]);

    return (
        <div className="space-y-6 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-600">Attendance for Student</h2>
            <form onSubmit={handleMarkAttendance} className="space-y-4">
                <div>
                    <label className="block text-lg font-medium mb-2">Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="input w-full px-4 py-2 border rounded-lg shadow-md"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium mb-2">Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="input w-full px-4 py-2 border rounded-lg shadow-md"
                    >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                </div>
                <button type="submit" className="btn bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
                    Mark Attendance
                </button>
            </form>
            <div>
                <h3 className="text-xl font-bold mb-4">Attendance History</h3>
                <ul className="space-y-2">
                    {attendance.map((att) => (
                        <li key={att.id} className="p-4 bg-white rounded-lg shadow-md">
                            Date: {new Date(att.date).toLocaleDateString()} | Status: {att.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Attendance;
