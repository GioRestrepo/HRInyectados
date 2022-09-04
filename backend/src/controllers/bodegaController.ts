import {Request, Response, text} from "express";
import { Op } from "sequelize";
import BodegasModel from "../models/bodegasModel"


class BodegaController {
    public async read(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        let bodegas =
        req.params["id"] != undefined
          ? await BodegasModel.findAll({
              where: {
                [Op.or]: [
                  {id: req.params["id"]},
                  {nombre: req.params["id"]}
                ]
              },
            })
          : await BodegasModel.findAll();
      if (!bodegas || bodegas.length == 0)
        return res
          .status(500)
          .send("Ha ocurrido un error al consultar las bodegas");
      return res.status(200).send(bodegas);

    }
    
    public async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
        if (
            !req.body.nombre
          )
            return res.status(400).send("Todos los campos son obligatorios");

            let bodegas = BodegasModel.build({
                nombre: req.body.nombre
              });
              try {
                await bodegas.save();
              } catch (error) {
                console.log(error);
                return res
                  .status(500)
                  .send("Ha ocurrido un error al guardar en la base de datos");
              }
              return res.status(201).send(bodegas);
        
    }
    public async update (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
        if (
            !req.body.nombre ||
            !req.params["id"]
          )
            return res.status(400).send("Todos los campos son obligatorios");
      
          let bodegaExistente = await BodegasModel.findAll({
            where: {
              id: req.params["id"],
            },
          });
          if (!bodegaExistente || bodegaExistente.length == 0)
            return res.status(400).send("La bodega indicada no existe");
      
          let bodega = bodegaExistente[0];
          bodega.set({
            nombre: req.body.nombre
          });
      
          try {
            await bodega.save();
          } catch (error) {
            console.log(error);
            return res
              .status(500)
              .send("Ha ocurrido un error al guardar en la base de datos");
          }
      
          return res.status(201).send(bodega);
    }
    public async delete (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
        if (!req.params["id"])
      return res
        .status(400)
        .send("El id del producto a eliminar es obligatorio");

    let bodegaExistente = await BodegasModel.findAll({
      where: {
        id: req.params["id"],
      },
    });
    if (!bodegaExistente || bodegaExistente.length == 0)
      return res.status(400).send("El producto indicado no existe");

    const producto = bodegaExistente[0];

    try {
      await producto.destroy();
    } catch (error) {
      return res.send(500).send("Ha ocurrido un error al eliminar la bodega");
    }
    return res.status(200).send("bodega Eliminada"); 
    }
    
}

const bodegaController = new BodegaController();

export default bodegaController; 