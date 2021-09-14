exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        { id: 2, name: "Ian" },
        { id: 1, name: "Alejandra" },
        { id: 3, name: "Chubby Gecko" },
      ]);
    });
};
