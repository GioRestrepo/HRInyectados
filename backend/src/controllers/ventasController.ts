import {Request, Response, text} from "express";
import { Op, Sequelize } from "sequelize";
import VentaModel from "../models/ventasModel";
import ProductosModel from "../models/productosModel";
import VentaProducto from "../models/ventaProductoModel";
import ClienteModel from "../models/clientesModel";
import Usuario from "../models/usuariosModel";

class VentasController {
    public async read(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        let ventas;
        if(req.params["id"] != undefined){
          try {
            ventas = await VentaProducto.findAll({
              include: [
                {
                  model: ProductosModel,

                  where: {
                    idProd: Sequelize.col("producto.id")
                  }
                },
                {
                  model: VentaModel,
                  
                  where: {
                    idVent: Sequelize.col("Venta.id")
                  }
                },
                {
                  model: ClienteModel,
                  
                  where: {
                    idCli: Sequelize.col("Cliente.id")
                  }
                }
              ],
              where: {
                idVent: req.params["id"]
              }
            })
          } catch (error) {
            console.log(error);
            }
          }else{
              try {
                ventas = await VentaProducto.findAll({
                  include: [
                    {
                      model: ProductosModel,
    
                      where: {
                        idProd: Sequelize.col("producto.id")
                      }
                    },
                    {
                      model: VentaModel,
                      
                      where: {
                        idVent: Sequelize.col("Venta.id")
                      }
                    },
                    {
                      model: ClienteModel,
                      
                      where: {
                        idCli: Sequelize.col("Cliente.id")
                      }
                    } 
                  ],
                })
            } catch (error) {
              console.log(error);
            }
          }
       
      if(!ventas)
        return res
          .status(500)
          .send("Ha ocurrido un error al consultar la venta");
      return res.status(200).send(ventas);

    }
    
    public async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
        if (
            !req.body.total ||
            !req.body.idProd ||
            !req.body.idCli 
          )
            return res.status(400).send("Todos los campos son obligatorios");
      
          let venta = VentaModel.build({
            total: req.body.total
          });

          let producto = await ProductosModel.findOne({
            where: {
              id: req.body.idProd
            }
          })
          console.log(producto);

          if (!producto) return res.status(400).send("El producto indicado no existe");

          let cliente = await ClienteModel.findOne({
            where: {
              id: req.body.idCli
          }
        })

          console.log(cliente);

          if (!cliente) return res.status(400).send("El cliente indicado no existe");
          
          let ventaProducto;

          try {
            await venta.save();
            ventaProducto = VentaProducto.build({
              idVent: venta.getDataValue("id"),
              idProd: req.body.idProd,
              idCli: req.body.idCli,
              nombre: req.body.nombre,
              total: req.body.total
            });
            await ventaProducto.save();
          } catch (error) {
            console.log(error);
            return res
              .status(500)
              .send("Ha ocurrido un error al guardar en la base de datos");
          }
      
          return res.status(201).send({
            id: venta.id,
            total: venta.total,
            cliente: {
              id: cliente.id,
              nombre: cliente.nombre

            }
          });
        
    }
    public async update (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
        if (
          !req.body.nombre ||
          !req.body.apellidos ||
          !req.body.email ||
          !req.body.telefono ||
          !req.body.documento ||
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
      
          let producto = await ProductosModel.findOne({
             where: {
               id: req.query.idProd 
             }
          });
          if (!producto) return res.status(400).send("El producto indicado no existe");

          let venta = ventaExistente[0];
          venta.set({
            total: req.body.total 
          })

          let ventaProduto = await VentaProducto.findOne({
            where: {
              idVent: req.params["id"]
            }
          });
          if (!ventaProduto)
           return res
            .status(400)
            .send("La venta indicada no existe")
      
          try {
            await venta.save();
            ventaProduto.set({
              idVent: venta.getDataValue("id"),
              idProd: req.body.idProd
            });
            await ventaProduto.save();
          } catch (error) {
            console.log(error);
            return res
              .status(500)
              .send("Ha ocurrido un error al guardar en la base de datos");
          }
      
          return res.status(201).send({
            id: venta.id,
            total: venta.total,
            producto: {
              id: producto.id,
              nombre: producto.nombre
            } 
          });
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