const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.get("/:note_id", (req, res) => {
  const noteID = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const output = json.filter((note) => note.note_id === noteID);
      return output.length > 0
        ? res.json(output)
        : res.json("No tip with that ID");
    });
});

notes.delete("/:note_id", (req, res) => {
  const noteID = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const output = json.filter((note) => note.note_id !== noteID);
      writeToFile("./db/db.json", output);
      res.json(`Item ${noteID} has been deleted.`);
    });
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const postItNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(postItNote, "./db/db.json");
    res.json("Note added.");
  } else {
    res.error("Note add failed.");
  }
});

module.exports = notes;
