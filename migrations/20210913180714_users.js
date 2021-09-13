
exports.up = function(knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.text("username", 128).notNullable();
    tbl.integer("room"); // needs to be replaced with foreign() to the room id
    tbl.primary("username", "room");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
