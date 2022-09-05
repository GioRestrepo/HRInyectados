import {Request, Response, text} from "express";
import { Op } from "sequelize";
import VentaModel from "../models/ventasModel"

class VentasController {
    public async read(req: Request, res: Response) {
        let ventas =
        req.params["id"] != undefined
          ? await VentaModel.findAll({
              where: {
                [Op.or]: [
                  {id: req.params["id"]},
                  {total: req.params["id"]}
                ]
              },
            })
          : await VentaModel.findAll();
      if (!ventas || ventas.length == 0)
        return res
          .status(500)
          .send("Ha ocurrido un error al consultar la venta");
      return res.status(200).send(ventas);

    }
    
    public async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
        if (
            !req.body.nombre ||
            !req.body.apellidos ||
            !req.body.email ||
            !req.body.telefono ||
            !req.body.documento ||
            !req.body.total
          )
            return res.status(400).send("Todos los campos son obligatorios");
      
          let venta = VentaModel.build({
            total: req.body.total
          });
      
          try {
            await venta.save();
          } catch (error) {
            console.log(error);
            return res
              .status(500)
              .send("Ha ocurrido un error al guardar en la base de datos");
          }
      
          return res.status(201).send(venta);
        
    }
    public async update (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
        if (
            !req.body.total ||
            !req.params["id"]
          )
            return res.status(400).send("Todos los campos son obligatorios");
      
          let ventaExistente = await VentaModel.findAll({
            where: {
              id: req.params["id"],
            },
          });
          if (!ventaExistente || ventaExistente.length == 0)
            return res.status(400).send("La venta indicada no existe");
      
          let venta = ventaExistente[0];
          venta.set({
            total: req.body.total
          });
      
          try {
            await venta.save();
          } catch (error) {
            console.log(error);
            return res
              .status(500)
              .send("Ha ocurrido un error al guardar en la base de datos");
          }
      
          return res.status(201).send(venta);
    }
    public async delete (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
        if (!req.params["id"])
      return res
        .status(400)
        .send("El id de la venta a eliminar es obligatorio");

    let ventaExistente = await VentaModel.findAll({
      where: {
        id: req.params["id"],
      },
    });
    if (!ventaExistente || ventaExistente.length == 0)
      return res.status(400).send("La venta indicado no existe");

    const venta = ventaExistente[0];

    try {
      await venta.destroy();
    } catch (error) {
      return res.send(500).send("Ha ocurrido un error al eliminar la venta");
    }
    return res.status(200).send("venta eliminada"); 
    }
    
}

const ventasController = new VentasController();

export default ventasController; 