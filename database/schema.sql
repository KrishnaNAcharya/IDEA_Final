-- First drop existing tables in correct order (due to foreign key constraints)
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS students;

DROP DATABASE IF EXISTS teacher_dashboard;
CREATE DATABASE teacher_dashboard;
USE teacher_dashboard;

-- Create students table with boolean status and no id
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    usn VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    status BOOLEAN NOT NULL
);