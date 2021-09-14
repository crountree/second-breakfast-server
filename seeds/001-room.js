exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("room")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("room").insert([
        {
          id: 1,
          expiration: knex.fn.now(),
          topic: "What restaurant should we go to?",
        },
        {
          id: 2,
          expiration: knex.fn.now(),
          topic: "Who is the best superhero?",
        },
        {
          id: 3,
          expiration: knex.fn.now(),
          topic: "How many points should 4905 have, including testing effort?",
        },
      ]);
    });
};
