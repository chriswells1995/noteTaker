
// first we require our packages
var express = require("express")
var path = require("path")
// then we require the constroctor class we made
const orm = require("./db/orm")

//  then we create out instance of the express server 
var app = express()

// then we set up our PORT to be process.env.PORT, or 8080 if that's unavailable
var PORT= process.env.PORT || 8080

// The middlewear
// Sets up the Express app to handle data parsing
// This helps parse data into a JSON format that we can read and it populates the req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// This reads everything from the public folder, specificallt the front end files
app.use(express.static("public"))



//   api calls

// After the client makes a "get" API request, this responds by using the getNotes function defined by the class constructor 
  app.get("/api/notes", function(req, res) {
    orm.getNotes()
    .then(function(notes){
      // it then responds with those results in JSON format
      res.json(notes)

    })
    // and this is for catching errors
    .catch(function(error){
      console.log(error)
      res.status(500).json(error)
    })
  });

// After the client makes a "post" API request, this responds by using the createNote function defined by the class constructor 
  app.post("/api/notes", function(req, res) {
    // the req.body, which is made possible by the middlewear, is passed into the creatNote class constructor method
    orm.createNote(req.body)
    // The result of that is passed into this function, and is sent back to the client as a JSON response
    .then(function(note){
      res.json(note)
    })
    // and this is for catching errors
    .catch(function(error){
      console.log(error)
      res.status(500).json(error)
    })
  });

// same as the above two, but deleting
  app.delete("/api/notes/:id", function(req,res){
    // This pulls the id number, and sends it through the removeNote() method
    orm.removeNote(req.params.id)
    .then(function(note){
      // res.json({okay:true})

      // then it responds that JSON is true, because there's no other info to send back
      res.json(true)
    })
    // error catch
    .catch(function(error){
      console.log(error)
      res.status(500).json(error)
    })    

  })


  

// html calls
// These need to go at the bottom or else they wreck everything

// brings up notes.html webpage
app.get("/notes", function(req, res) {
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