exports.up = function (knex, Promise) {
  // don't forget the return statement
  return knex.schema.createTable("entries", (tbl) => {
    // creates a primary key called id
    tbl.increments();
    // creates a text field called name which is both required and unique
    tbl.text("name", 128).unique().notNullable();
    tbl.boolean("servesBeer");
    tbl.text("description");
    tbl.text("type");
  });
};

exports.down = function (knex, Promise) {
  // drops the entire table
  return knex.schema.dropTableIfExists("entries");
};
