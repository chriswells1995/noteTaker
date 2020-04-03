
const util = require("util")
var fs = require("fs")


var writefile = util.promisify(fs.writeFile)
var readfile = util.promisify(fs.readFile)

class orm{
    constructor(){
        this.id=0;

    }

    getNotes(){
        return readfile("db/db.json", "utf8")
        .then(function(notes){

            var retrievedNotes;
            try {
                retrievedNotes=[].concat(JSON.parse(notes))
            } catch (error) {
                console.log("Something went wrong ", error)
                retrievedNotes=[]
            }
            return retrievedNotes;
        })


        
    }

    createNote(note){
        const title=note.title;
        const text=note.text;
        // same as const id=this.id++
        const newNote = {title, text, id:++this.id}
        return this.getNotes()
        .then(function(notes){
            console.log("notes" , notes);
           return [...notes, newNote]
            // takes an array of notes and spreads them out and adds newNote to it

        })
        .then(function(newSetOfNotes){
            // console.log(newSetOfNotes);
            writefile("db/db.json", JSON.stringify(newSetOfNotes))

        })
        .then(function(){
            console.log(newNote)
            return newNote;

        })

    }

    removeNote(id){
        return this.getNotes()
        .then(function(notes){
            notes.filter(note=>note.id!==parseInt(id))

        })
        .then(function(filteredNotes){
            writefile("db/db.json", JSON.stringify(filteredNotes))

        })

    }



}

module.exports= new orm();