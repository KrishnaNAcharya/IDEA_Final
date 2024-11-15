import React, { useState, useEffect } from "react";
import { getAttendance, markAttendance } from "../api";
import { useParams } from "react-router-dom";

const Attendance = () => {
    const { studentId } = useParams();
    const [attendance, setAttendance] = useState([]);
    const [status, setStatus] = useState("Present");

    const fetchAttendance = async () => {
        try {
            const response = await getAttendance(studentId);
            setAttendance(response.data);
        } catch (error) {
            console.error("Error fetching attendance", error);
        }
    };

    const handleMarkAttendance = async (date) => {
        try {
            await markAttendance({ student_id: studentId, date, status });
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
            <div>
                <label className="block text-lg font-medium mb-2">Mark Attendance:</label>
                <div className="space-x-4">
                    <button onClick={() => handleMarkAttendance("2024-11-01")} className="btn bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
                        Mark 2024-11-01 as {status}
                    </button>
                    <button onClick={() => handleMarkAttendance("2024-11-02")} className="btn bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
                        Mark 2024-11-02 as {status}
                    </button>
                </div>
            </div>
            <ul className="space-y-2">
                {attendance.map((att) => (
                    <li key={att.id} className="p-4 bg-white rounded-lg shadow-md">
                        Date: {att.date} | Status: {att.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Attendance;
