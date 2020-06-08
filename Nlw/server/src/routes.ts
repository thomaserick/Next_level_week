import express, { json, response } from "express";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/itemscontroller";
import multer from "multer";
import multerConfig from "../config/multer";

const routes = express.Router();
const upload = multer.(multerConfig);
//Cria uma instancia
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);

routes.post("/points",upload.sigle('image'), pointsController.create);



routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

export default routes;
