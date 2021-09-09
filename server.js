const express = require("express");
// const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
const port = 3030;

let restaurants = [
  {
    id: 1,
    name: "Taste of Italy",
    servesBeer: false,
    type: "Italian",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    name: "Nawab",
    servesBeer: true,
    type: "Indian",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    name: "Genki",
    servesBeer: true,
    type: "Japanese",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    name: "Mess Hall",
    servesBeer: true,
    type: "American",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

let nextId = restaurants.length + 1;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/data", (req, res) => {
  res.json(restaurants);
});

app.post("/data", (req, res) => {
  let data = req.body;
  if (!data) {
    res.sendStatus(400);
    return;
  }

  let errors = 0;
  let newRestaurants =
    data &&
    data.map((item) => {
      if (!item.name) {
        errors += 1;
        return;
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
    errors: `Failed to create ${errors} items`,
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
