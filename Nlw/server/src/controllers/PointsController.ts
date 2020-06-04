import { Request, Response } from "express";
import knex from "../database/connection";

class PointController {
  async index(req: Request, res: Response) {
    const point = await knex("point");
  }

  async show(req: Request, res: Response) {
    //Destruturacao

    const { id } = req.params;

    const point = await knex("point").where("id", id).first();

    if (!point) {
      return res.status(400).json({
        message: "Point not found",
      });
    }

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.items_id")
      .where("point_items.point_id", id);
    //      .select('items.title')

    return res.json({ point, items });
  }
  async create(req: Request, res: Response) {
    //Destruturacao
    const {
      name,
      email,
      phone,
      latitude,
      longitude,
      endnum,
      city,
      uf,
      items,
    } = req.body;

    //Se uma Query falhar a outra falha
    const trx = await knex.transaction();

    const point = {
      image: "Image-default",
      name,
      email,
      phone,
      latitude,
      longitude,
      endnum,
      city,
      uf,
    };

    const insertedIds = await trx("point").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((items_id: Number) => {
      return {
        items_id,
        point_id,
      };
    });

    await trx("point_items").insert(pointItems);

    return res.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointController;
