import express from "express";

const app = express();

//Rota: Endereco completo
//Recurso: Qual entidade

app.get("/users", (req, res) => {
  res.json(["Thomas", "Jaque", "Paulo", "Rose"]);
});

app.post("/users", (req, res) => {
  const user = {
    name: "Thomas Erick",
    email: "thominhaserick@gmail.com",
  };
  return res.json(user);
});
app.listen(3333);
