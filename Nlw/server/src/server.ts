import express from "express";
import path from "path";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

//Rota: Endereco completo
//Recurso: Qual entidade

app.listen(3333);
