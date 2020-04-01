
var express = require("express")
var path = require("path")
var fs = require("fs")

var json = require("./Develop/db/db.json")

var app = express()

var PORT=8080

// Sets up the Express app to handle data parsing
// This helps parse data into a JSON format that we can read and it populates the req.body

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(json)

// probably not needed
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "..Develop/public/index.html"));
  });


// brings up notes.html
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "..Develop/public/notes.html"));
  });

//   brings up homepage as a catch all
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "..Develop/public/index.html"));
  });


//   api calls

// calls notes
  app.get("/api/notes", function(req, res) {
    res.json(tableData);
  });


  app.post("/api/notes", function(req, res) {
    // if there are less than 5 tables
    if (tableData.length < 5) {
      // req.body is fed it's value via our middleware from server just
        /*
          app.use(express.urlencoded({ extended: true }));
          app.use(express.json());
        */
      // req.body is an object containing the incoming data
       /*
      Below is our incoming data that will feed the req.body object
      {
        customerName: 'Tom'
        phoneNumber: 555-555-5555
        customerEmail: tom@gmail.com
        customerID: 1
      };
       */
      tableData.push(req.body);
      // res is our response object
      /*
        Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().

        The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON.
      */
      res.json({ message: 'Added to current reservation! You may be seated' });
    }
    else {
      waitListData.push(req.body);
      res.json(false);
    }
  });





// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });