const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Annuman@7",
    database: "teacher_dashboard",
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1); // Exit if the database connection fails
    }
    console.log("MySQL Connected...");
});

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Teacher Dashboard API");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Fetch all students
app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).send({ error: "Error fetching students", details: err });
        }
        res.json(results);
    });
});

// Add a student
app.post("/students", (req, res) => {
    const { name, usn } = req.body;

    if (!name || !usn) {
        return res.status(400).send({ error: "Name and USN are required" });
    }

    const sql = "INSERT INTO students (name, usn) VALUES (?, ?)";
    db.query(sql, [name, usn], (err, result) => {
        if (err) {
            console.error("Error adding student:", err);
            return res.status(500).send({ error: "Error adding student", details: err });
        }
        res.status(201).send({ id: result.insertId, message: "Student added successfully" });
    });
});

// Remove a student (and their attendance)
app.delete("/students/:id", (req, res) => {
    const { id } = req.params;

    const deleteAttendanceSql = "DELETE FROM attendance WHERE student_id = ?";
    db.query(deleteAttendanceSql, [id], (err) => {
        if (err) {
            console.error("Error removing attendance records:", err);
            return res.status(500).send({ error: "Error removing attendance records", details: err });
        }

        const deleteStudentSql = "DELETE FROM students WHERE id = ?";
        db.query(deleteStudentSql, [id], (err, result) => {
            if (err) {
                console.error("Error removing student:", err);
                return res.status(500).send({ error: "Error removing student", details: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).send({ error: "Student not found" });
            }
            res.status(200).send({ message: "Student removed successfully" });
        });
    });
});

// Mark attendance
app.post("/attendance", (req, res) => {
    const { student_id, date, status } = req.body;

    if (!student_id || !date || !status) {
        return res.status(400).send({ error: "Student ID, date, and status are required" });
    }

    const sql = "INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)";
    db.query(sql, [student_id, date, status], (err) => {
        if (err) {
            console.error("Error marking attendance:", err);
            return res.status(500).send({ error: "Error marking attendance", details: err });
        }
        res.status(201).send({ message: "Attendance marked successfully" });
    });
});

// Get attendance for a specific student
app.get("/attendance/:student_id", (req, res) => {
    const { student_id } = req.params;

    const sql = "SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC";
    db.query(sql, [student_id], (err, results) => {
        if (err) {
            console.error("Error fetching attendance:", err);
            return res.status(500).send({ error: "Error fetching attendance", details: err });
        }
        res.json(results);
    });
});
