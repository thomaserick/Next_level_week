import Knex from "knex";

export async function up(knex: Knex) {
  //Create Table
  return knex.schema.createTable("point", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable;
    table.string("email").notNullable;
    table.string("Image").notNullable;
    table.string("phone").notNullable;
    table.decimal("latitude").notNullable;
    table.decimal("longitude").notNullable;
    table.integer("endnum");
    table.string("city").notNullable;
    table.string("uf", 2).notNullable;
  });
}

export async function down(knex: Knex) {
  //Delete table
  return knex.schema.dropTable("point");
}
