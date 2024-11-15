import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentList from "./components/StudentList";
import Attendance from "./components/Attendance";

const App = () => {
    return (
        <Router>
            <div className="p-8">
                <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
                <Routes>
                    <Route path="/" element={<StudentList />} />
                    <Route path="/attendance/:studentId" element={<Attendance />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
