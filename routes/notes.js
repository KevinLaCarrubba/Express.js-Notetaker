//const var requirements
const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

//notes get root file 
notes.get("/", (req, res) => {
  //read from database. then take data and parse it
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//notes get note_uuid
notes.get("/:id", (req, res) => {
  //set noteID to param.note_id
  const noteID = req.params.id;
  //read from database
  readFromFile("./db/db.json")
  //parse data
    .then((data) => JSON.parse(data))
    .then((json) => {
      //filter through output of note to find note.note_id thats === noteID
      const output = json.filter((note) => note.id === noteID);
      //return if there is an output
      return output.length > 0
        ? res.json(output)
        : res.json("No note with that ID");
    });
});
//notes. to delete get uuid
notes.delete("/:id", (req, res) => {
  //set noteID to param.note_id
  const noteID = req.params.id;
  //read from database
  readFromFile("./db/db.json")
  //parse the data
    .then((data) => JSON.parse(data))
    .then((json) => {
      //filter to find matching ID to delete
      const output = json.filter((note) => note.id !== noteID);
      console.log(output)
      //rewrite to file after deleting
      writeToFile("./db/db.json", output);
      res.json(`Item ${noteID} has been deleted.`);
    });
});
//create new note to post
//get notes.post root folder
notes.post("/", (req, res) => {
  //destructure database to req.body;
  const { title, text } = req.body;
//if there is content 
  if (req.body) {
    const postItNote = {
      title,
      text,
      id: uuidv4(),
    };
//append postItNote object to file
    readAndAppend(postItNote, "./db/db.json");
    res.json("Note added.");
  } else {
    res.error("Note add failed.");
  }
});
//export notes
module.exports = notes;
