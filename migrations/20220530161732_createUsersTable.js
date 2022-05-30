/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.text("name", 255);
      tbl.text("username", 255).notNullable().unique().index();
      tbl.text("password", 255).notNullable();
      tbl.text("role", 255).notNullable();
      tbl.text("security_que").notNullable();
      tbl.text("security_ans").notNullable();
      tbl.timestamps(true, true);
    })
    .createTable("blogs", (tbl) => {
      tbl.increments();
      tbl.text("title").notNullable();
      tbl.text("content").notNullable();
      tbl.text("status").notNullable();
      tbl.timestamps(true, true);
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("blogs").dropTableIfExists("users");
};
