exports.up = function (knex) {
  return knex.schema
    .createTable("room", (tbl) => {
      tbl.increments("id");
      tbl.datetime("expiration");
      tbl.text("topic");
    })
    .createTable("entry", (tbl) => {
      tbl.increments("id");
      tbl.text("name", 128).unique().notNullable();
      tbl.text("type");
      tbl.boolean("servesBeer");
      tbl.text("description");
      tbl.integer("roomId").unsigned();
      tbl.foreign("roomId").references("id").inTable("room");
    })
    .createTable("user", (tbl) => {
      tbl.increments("id");
      tbl.text("name");
    })
    .createTable("userRoom", (tbl) => {
      tbl.integer("userId").unsigned();
      tbl.integer("roomId").unsigned();
      tbl.foreign("userId").references("id").inTable("user");
      tbl.foreign("roomId").references("id").inTable("room");
      tbl.primary(["userId", "roomId"]);
    })
    .createTable("vote", (tbl) => {
      tbl.integer("userId").unsigned();
      tbl.integer("entryId").unsigned();
      tbl.foreign("userId").references("id").inTable("user");
      tbl.foreign("entryId").references("id").inTable("entry");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("vote")
    .dropTableIfExists("userRoom")
    .dropTableIfExists("user")
    .dropTableIfExists("entry")
    .dropTableIfExists("room");
};
