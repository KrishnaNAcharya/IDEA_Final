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
    const sql = "SELECT * FROM students ORDER BY date DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).send({ error: "Error fetching students", details: err });
        }
        res.json(results.map(student => ({
            ...student,
            status: Boolean(student.status)
        })));
    });
});

// Add a student
app.post("/students", (req, res) => {
    const { name, usn, date, status } = req.body;

    if (!name || !usn || !date || status === undefined) {
        return res.status(400).send({ error: "Name, USN, date and status are required" });
    }

    const sql = "INSERT INTO students (name, usn, date, status) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, usn, date, status], (err, result) => {
        if (err) {
            console.error("Error adding student:", err);
            return res.status(500).send({ error: "Error adding student", details: err });
        }
        res.status(201).send({ message: "Student added successfully" });
    });
});

// Remove a student by ID
app.delete("/students/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM students WHERE id = ?";
    db.query(sql, [id], (err, result) => {
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

// Remove a student by USN
app.delete("/students/:usn", (req, res) => {
    const { usn } = req.params;
    const sql = "DELETE FROM students WHERE usn = ?";
    db.query(sql, [usn], (err, result) => {
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

// Update student status
app.put("/students/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (status === undefined) {
        return res.status(400).send({ error: "Status is required" });
    }

    const sql = "UPDATE students SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error("Error updating student status:", err);
            return res.status(500).send({ error: "Error updating student status", details: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Student not found" });
        }
        res.status(200).send({ message: "Student status updated successfully" });
    });
});
