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

app.get("/user", (req, res) => {
  db("users")
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to get Users", error: error });
    });
});

app.post("/user", (req, res) => {
  let user = req.body;
  if (!user) {
    res.sendStatus(400);
    return;
  }
  db("users")
    .insert(user)
    .then((result) => {
      res.json({ success: true, message: result }); 
    })
    .catch((error) => {
      res.json({ success: false, message: error });
    });
});

app.get("/data", (req, res) => {
  db("entry")
    .then((entry) => {
      res.json(entry);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to get Entries", error: error });
    });
});

app.post("/restaurant", (req, res) => {
  let data = req.body;
  if (!data) {
    res.sendStatus(400);
    return;
  }
  db("entry")
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
