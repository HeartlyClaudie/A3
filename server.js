/*********************************************************************************
* WEB700 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Claude Kaiser Espanillo Student ID: 151882230 Date: 06-22-2024
*
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var collegeData = require("./modules/collegeData");

var app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

// GET /students
app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({ message: "no results" });
            });
    } else {
        collegeData.getAllStudents()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({ message: "no results" });
            });
    }
});

// GET /tas
app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: "no results" });
        });
});

// GET /courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: "no results" });
        });
});

// GET /student/num
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: "no results" });
        });
});

// GET /
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

// GET /about
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

// GET /htmlDemo
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});

// [ no matching route ]
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

// Initialize and start the server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("server listening on port: " + HTTP_PORT);
        });
    })
    .catch((err) => {
        console.log("Unable to start server: " + err);
    });
