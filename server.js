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

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

app.listen(5000, () => console.log("Server running on port 5000"));

// Fetch all students
app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results); // Send the list of students as a JSON response
    });
});

// Add Student
app.post("/students", (req, res) => {
    const { name, email } = req.body;
    const sql = "INSERT INTO students (name, email) VALUES (?, ?)";
    db.query(sql, [name, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: result.insertId });
    });
});

// Remove Student
app.delete("/students/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM students WHERE id = ?";
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send("Student removed");
    });
});

// Mark Attendance
app.post("/attendance", (req, res) => {
    const { student_id, date, status } = req.body;
    const sql = "INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)";
    db.query(sql, [student_id, date, status], (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send("Attendance marked");
    });
});

// Get Attendance for a Student
app.get("/attendance/:student_id", (req, res) => {
    const { student_id } = req.params;
    const sql = "SELECT * FROM attendance WHERE student_id = ?";
    db.query(sql, [student_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});
