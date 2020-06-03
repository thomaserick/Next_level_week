import express from "express";

const app = express();

app.get("/users", (req, res) => {
  res.send(`<h1>Hello Word</h1>`);
});

app.listen(3333);
