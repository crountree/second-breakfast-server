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

  let errors = 0;
  let newRestaurants =
    data &&
    data
      .filter((item) => {
        return item.name != null;
      })
      .map((item) => {
        console.log("what is" + JSON.stringify(item));
        if (!item.name) {
          errors += 1;
        } else {
          let restaurant = {
            id: nextId,
            name: item.name,
            servesBeer: item.servesBeer ? item.servesBeer : false,
            type: item.type ? item.type : "",
            description: item.description ? item.description : "",
          };
          nextId++;
          return restaurant;
        }
      });

  restaurants = restaurants.concat(newRestaurants);
  let response = {
    responseBody: newRestaurants,
    transactionDetails: `${errors} of supplied entries were malformed and unable to be inserted`,
  };

  if (restaurants.length) {
    res.status(201).json(response);
  } else {
    res.status(400);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
