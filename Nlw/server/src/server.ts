import express from "express";

const app = express();

app.get("/users", (req, res) => {
  res.json(["Thomas", "Jaque", "Paulo", "Rose"]);
});

app.listen(3333);
