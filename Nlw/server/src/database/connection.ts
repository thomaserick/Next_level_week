import knex from "knex";
import path from "path"; //Uni caminhos

const connection = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "database.sqlite"),
  },
});
export default connection;
