const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const moment = require("moment");

// Sets localhost: PORT
const PORT = process.env.PORT || 3001;

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
    db = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json"), 'utf-8'));
    console.log(db);
    res.json(db);
});

// POST
app.post("/api/notes", function(req, res) {
    var data = {
        id: moment().format(), //format(lll)
        title: req.body.title,
        text: req.body.text
    }

    db.push(data);
    fs.writeFile("./db/db.json", JSON.stringify(db), function(err) {
        if (err) throw err;
        console.log("Note posted");
        res.json(db);
    });
});

// DELETE
app.delete("/api/notes/:id", (req, res) => {
    db = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json"), 'utf-8'));

    (async() => {
        const deleteNote = db.indexOf(db.find(index => index.id === req.params.id));
        console.log(deleteNote);
        db.splice(deleteNote, 1);

        fs.writeFile("./db/db.json", JSON.stringify(db), function(err) {
            if (err) throw err;
            console.log("Note deleted");
            res.json(req.body);
        });
    })();
});

// Listener for the PORT and logs a print when the server is running
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});