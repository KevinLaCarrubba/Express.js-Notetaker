const express = require("express");
const path = require("path");
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use("/api", api);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.listen(PORT, () =>
  console.log(`The app is listening at http://localhost:${PORT}`)
);
