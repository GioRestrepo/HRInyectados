import {Request, Response} from "express";
import { Op } from "sequelize";
import ProductosModel from "../models/productosModel"

class ProductosController {
    public async read(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        let productos =
        req.params["id"] != undefined
          ? await ProductosModel.findAll({
              where: {
                [Op.or]: [
                  {id: req.params["id"]},
                  {nombre: req.params["id"]}
                ]
              },
            })
          : await ProductosModel.findAll();
      if (!productos || productos.length == 0)
        return res
          .status(500)
          .send("Ha ocurrido un error al consultar los productos");
      return res.status(200).send(productos);

    }
    
    public async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
        if (
            !req.body.nombre ||
            !req.body.valor 
          )
            return res.status(400).send("Todos los campos son obligatorios");

            let productos = ProductosModel.build({
                nombre: req.body.nombre,
                valor: req.body.valor
              });
              try {
                await productos.save();
              } catch (error) {
                console.log(error);
                return res
                  .status(500)
                  .send("Ha ocurrido un error al guardar en la base de datos");
              }
              return res.status(201).send(productos);
    }
    public async update (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
        if (
            !req.body.nombre ||
            !req.body.valor ||
            !req.params["id"]
          )
            return res.status(400).send("Todos los campos son obligatorios");
      
          let productoExistente = await ProductosModel.findAll({
            where: {
              id: req.params["id"],
            },
          });
          if (!productoExistente || productoExistente.length == 0)
            return res.status(400).send("El producto indicado no existe");
      
          let producto = productoExistente[0];
          producto.set({
            nombre: req.body.nombre,
            valor: req.body.valor
          });
      
          try {
            await producto.save();
          } catch (error) {
            console.log(error);
            return res
              .status(500)
              .send("Ha ocurrido un error al guardar en la base de datos");
          }
      
          return res.status(201).send(producto);
    }
    public async delete (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
        if (!req.params["id"])
      return res
        .status(400)
        .send("El id del producto a eliminar es obligatorio");

    let productoExistente = await ProductosModel.findAll({
      where: {
        id: req.params["id"],
      },
    });
    if (!productoExistente || productoExistente.length == 0)
      return res.status(400).send("El producto indicado no existe");

    const producto = productoExistente[0];

    try {
      await producto.destroy();
    } catch (error) {
      return res.send(500).send("Ha ocurrido un error al eliminar el producto");
    }
    return res.status(200).send("producto Eliminado");
  } 
    }
    


const productosController = new ProductosController();

export default productosController; 