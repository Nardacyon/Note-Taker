const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// Sets localhost: PORT
const PORT = 3000;

// Routes
app.use(express.static("public"));
app.use(express.static("db"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    let readNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json"), 'utf-8'));
    res.json(readNotes);
});

// POST
// app.post("/api/notes", function(req, res) {
//     readNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json"), 'utf-8'));
//     let addNote = req.body;

//     let noteID = [];

// });



// Listener for the PORT and logs a print when the server is running
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});