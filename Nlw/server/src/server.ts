import express from "express";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(routes);

//Rota: Endereco completo
//Recurso: Qual entidade

app.listen(3333);
