const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Annuman@7",
    database: "teacher_dashboard",
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");

    const dropForeignKeySql = "ALTER TABLE attendance DROP FOREIGN KEY attendance_ibfk_1";
    const dropTableSql = "DROP TABLE IF EXISTS students";
    const createTableSql = `
        CREATE TABLE students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            usn VARCHAR(255) NOT NULL UNIQUE
        )
    `;
    const addForeignKeySql = "ALTER TABLE attendance ADD CONSTRAINT attendance_ibfk_1 FOREIGN KEY (student_id) REFERENCES students(id)";

    db.query(dropForeignKeySql, (err) => {
        if (err) throw err;
        console.log("Foreign key constraint dropped");

        db.query(dropTableSql, (err) => {
            if (err) throw err;
            console.log("Table 'students' dropped");

            db.query(createTableSql, (err) => {
                if (err) throw err;
                console.log("Table 'students' created");

                db.query(addForeignKeySql, (err) => {
                    if (err) throw err;
                    console.log("Foreign key constraint added");
                    db.end();
                });
            });
        });
    });
});