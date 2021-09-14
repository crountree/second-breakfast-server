exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("vote")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("vote").insert([
        { userId: 1, entryId: 1 },
        { userId: 2, entryId: 2 },
        { userId: 3, entryId: 3 },
      ]);
    });
};
