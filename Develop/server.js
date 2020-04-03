
var express = require("express")
var path = require("path")

const orm = require("./db/orm")



var app = express()


var PORT=8080

// Sets up the Express app to handle data parsing
// This helps parse data into a JSON format that we can read and it populates the req.body

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// reads everything from the public folder
app.use(express.static("public"))

// console.log(notesDB)

// html calls

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/index.html"));
//   });





//   api calls

// calls notes
  app.get("/api/notes", function(req, res) {
    orm.getNotes()
    .then(function(notes){
      res.json(notes)

    })
    .catch(function(error){

      res.status(500).json(error)
    })
  });


  app.post("/api/notes", function(req, res) {
    // console.log(req.body)
    orm.createNote(req.body)
    .then(function(note){
      console.log("sevrer notes ", note)
      res.json(note)

    })
    .catch(function(error){
      console.log(error)
      res.status(500).json(error)
    })

  });


// brings up notes.html
app.get("/notes", function(req, res) {
  console.log(__dirname)
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//   brings up homepage as a catch all
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });