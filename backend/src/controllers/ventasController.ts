import { Request, Response, text } from "express";
import sequelizeDb from "../database";
const sequelize = sequelizeDb.getSequelize();
import { Op, Sequelize } from "sequelize";
import VentaModel from "../models/ventasModel";
import ProductosModel from "../models/productosModel";
import VentaProducto from "../models/ventaProductoModel";
import ClienteModel from "../models/clientesModel";
import Usuario from "../models/usuariosModel";

class VentasController {
  public async read(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    let ventas, metadata;
    try {
      [ventas, metadata] = await sequelize.query(`
    select VP.idVent, VP.idProd, P.nombre as nomProd, P.valor, V.idCli, C.nombre as nomCli, C.apellidos from venta_products VP
    inner join ventas V on V.id = VP.idVent
    inner join productos P on P.id = VP.idProd
    inner join clientes C on C.id = V.idCli
    ${
      req.params["id"] != null  
        ? 'where C.id = ' + req.params["id"]
        : ''
    };
    `);
    } catch (error) {
      return res.status(500).send("ha ocurrido un error al consultar las ventas")
    }



    return res.status(200).send(ventas);
  }

  public async create(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    if (!req.body.idCli || !req.body.items || req.body.items.length == 0)
      return res.status(400).send("Todos los campos son obligatorios");

    let tempClient = await ClienteModel.findOne({
      where: {
        id: req.body.idCli,
      },
    });

    if (!tempClient)
      return res.status(400).send("El cliente indicado no existe");

    let venta = VentaModel.build({
      idCli: req.body.idCli,
    });

    let productos = await ProductosModel.findAll();

    if (!productos || productos.length == 0)
      return res.status(400).send("No se encontro ningun producto registrado");

    let selectedProducts = productos.filter((product) => {
      let tempProd = null;
      req.body.items.forEach((item: any) => {
        if (item.id == product.id) {
          tempProd = product;
        }
      });
      return tempProd != null;
    });

    if (req.body.items.length != selectedProducts.length)
      return res.status(400).send("Uno de los productos indicados no existe");

    try {
      await venta.save();
      console.log("venta almacenada"); // !to delete
      for (let i = 0; i < selectedProducts.length; i++) {
        await VentaProducto.create({
          idVent: venta.id,
          idProd: selectedProducts[i].id,
        });
      }
      console.log("venta_producto, creada!"); // ! to delete
    } catch (error) {
      return res
        .status(500)
        .send("Ha ocurrido un error al guardar en la base de datos");
    }

    let total = 0;
    selectedProducts.forEach((product) => {
      total += product.valor;
    });

    return res.status(200).send({
      cliente: {
        id: tempClient.id,
        nombre: tempClient.nombre,
        apellidos: tempClient.apellidos,
        email: tempClient.email,
        documento: tempClient.documento,
      },
      items: selectedProducts,
      total: total,
    });
  }
  public async update(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    return res.send("update prod");
  }

  public async delete(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
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
