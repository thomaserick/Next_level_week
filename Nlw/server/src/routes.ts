import express, { json, response } from "express";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/itemscontroller";

const routes = express.Router();
//Cria uma instancia
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);

routes.post("/points", pointsController.create);
routes.post("/points/:id", pointsController.show);

export default routes;
