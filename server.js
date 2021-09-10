const express = require("express");
// const bodyParser = require('body-parser');
const app = express();
app.use(express.json());

const port = 3030;
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// DATABASE CONNECTION PROBABLY SHOULDN"T GO HERE???
const db = require("./data/db-config.js");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/data", (req, res) => {
  db("entries")
    .then((entry) => {
      res.json(entry);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get Entries" });
    });
});

app.post("/restaurant", (req, res) => {
  let data = req.body;
  if (!data) {
    res.sendStatus(400);
    return;
  }
  db("entries")
    .insert(data)
    .then((result) => {
      res.json({ success: true, message: result }); 
    })
    .catch((error) => {
      res.json({ success: false, message: error });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
