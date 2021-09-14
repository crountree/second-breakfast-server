exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("userRoom")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("userRoom").insert([
        { userId: 1, roomId: 1 },
        { userId: 2, roomId: 1 },
        { userId: 3, roomId: 1 },
      ]);
    });
};
