// we require util and fs because we need promisify, readFile, and writeFile
const util = require("util")
var fs = require("fs")

// we promisify a readfile and writefile so we can work with .then's and make things efficient. 
var writefile = util.promisify(fs.writeFile)
var readfile = util.promisify(fs.readFile)

// we define a globalID of 0, and make it a global variable because it will be used multiple times in functions.
var globalID= 0;

// we create a constructor class called orm. In the interest of transperancy this was my tutor's idea. 
class orm{
    constructor(){
        // we declare an id property
        this.id=0;
    }
    // we create methods

    // this method is responsible for reading the info from the JSON file
    getNotes(){
        // we use the promisified readfile() function to read the JSON file in utf8 characters
        return readfile("db/db.json", "utf8")
        // then what we read is passed into the next function as "notes"
        .then(function(notes){
            // we declare a variable called retrievedNotes
            var retrievedNotes;
            // simmilar to an if statement with an error catch, I think,
            // this try catch will format our notes
            try {
                retrievedNotes=[].concat(JSON.parse(notes))
            } catch (error) {
                console.log("Something went wrong ", error)
                retrievedNotes=[]
            }
            // these correctly formated notes are then sent back to whatever called getNotes()
            return retrievedNotes;
        })
    }

    // this method is for posting the notes
    createNote(note){
        // we declare title and text properties based off of the note object passed in
        const title=note.title;
        const text=note.text;
        // we increase the global ID by 1 so each IS will be different
        globalID++;
        // we set an ID varibale equal to the global ID
        const ID = globalID;
        // we create a newNote object with the properties and values of 
        // the passed in note's title and text, and the global ID 
        const newNote = {title, text, id:ID};
        // we that run getNotes() and return the information it brought back, passing it into the .then
        return this.getNotes()
        .then(function(notes){
            // we then take the array of notes the getNotes() returns, "spread" them out and adds newNote to it, then pass it into the next .then
           return [...notes, newNote]

        })
        // The combined array of the old notes and the one new note is now called newSetOfNotes
        .then(function(newSetOfNotes){
            // we JSON.stringify those notes, putting them in the right format, then write them to the JSON file. 
            // This overwrites anything there, but what we're wrighting should be everything that was there plus one more note.
            writefile("db/db.json", JSON.stringify(newSetOfNotes))

        })
        // and we pass all of that into one more .then, returning it. 
        .then(function(){
            return newNote;

        })

    }

    // The last method if for deleting, and an ID needs to be passed into it
    removeNote(id){
        //first it runs getNotes() and passes what's returned into the .then
        return this.getNotes()
        // then with those notes, run a fat arrow filter function to remove any notes with the specified ID from the array
        .then(function(notes){
           return notes.filter(note=>note.id!==parseInt(id))
            // that new array, one note shorter, is now passed into the next .then, now called filteredNotes
        })
        // 
        .then(function(filteredNotes){
            // This array is JSON stringified into the correct format, then overwites the JSON file.
            // This creates an array of objects exaclty the same as the one before it, minus that specific object.
            writefile("db/db.json", JSON.stringify(filteredNotes))

        })
    }
}
// This exports our class constructor
module.exports= new orm();