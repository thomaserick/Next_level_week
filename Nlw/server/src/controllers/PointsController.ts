import { Request, Response } from "express";
import knex from "../database/connection";

class PointController {
  async index(req: Request, res: Response) {
    //cidades,uf,items (Query Params)

    const { city, uf, items } = req.query;
    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("point")
      .join("point_items", "point.id", "=", "point_items.point_id")
      .whereIn("point_items.items_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("point.*");

    return res.json(points);
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
      image:
        "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
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

    await trx.commit();

    return res.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointController;
