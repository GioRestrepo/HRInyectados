import {Request, Response, text} from "express";
import { Op } from "sequelize";
import ClienteModel from "../models/clientesModel";


class ClientesController {
    public async read(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
      let clientes =
      req.params["id"] != undefined
        ? await ClienteModel.findAll({
            where: {
              [Op.and]: [
                {id: req.params["id"]},
                {nombre: req.params["id"]},
                {documento: req.params["id"]}
              ]
            },
          })
        : await ClienteModel.findAll();
    if (!clientes || clientes.length == 0)
      return res
        .status(500)
        .send("Ha ocurrido un error al consultar el cliente");
    return res.status(200).send(clientes);

    }
    
    public async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
        if (
            !req.body.nombre ||
            !req.body.apellidos ||
            !req.body.email ||
            !req.body.telefono ||
            !req.body.documento
          )
            return res.status(400).send("Todos los campos son obligatorios");
      
          let cliente = ClienteModel.build({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            telefono: req.body.telefono,
            documento: req.body.documento
          });
      
          try {
            await cliente.save();
          } catch (error) {
            console.log(error);
            return res
              .status(500)
              .send("Ha ocurrido un error al guardar en la base de datos");
          }
      
          return res.status(201).send(cliente);
        
    }
    public async update (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
      if (
        !req.body.nombre ||
        !req.body.apellidos ||
        !req.body.email ||
        !req.body.telefono ||
        !req.body.documento ||
        !req.params["id"]
      )
        return res.status(400).send("Todos los campos son obligatorios");
  
      let clienteExistente = await ClienteModel.findAll({
        where: {
          id: req.params["id"],
        },
      });
      if (!clienteExistente || clienteExistente.length == 0)
        return res.status(400).send("El producto indicado no existe");
  
      let cliente = clienteExistente[0];
      cliente.set({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        telefono: req.body.telefono,
        documento: req.body.documento
      });
  
      try {
        await cliente.save();
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send("Ha ocurrido un error al guardar en la base de datos");
      }
  
      return res.status(201).send(cliente);
    }
    public async delete (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
      if (!req.params["id"])
      return res
        .status(400)
        .send("El id del cliente a eliminar es obligatorio");

    let clienteExistente = await ClienteModel.findAll({
      where: {
        id: req.params["id"],
      },
    });
    if (!clienteExistente || clienteExistente.length == 0)
      return res.status(400).send("El cliente indicado no existe");

    const cliente = clienteExistente[0];

    try {
      await cliente.destroy();
    } catch (error) {
      return res.send(500).send("Ha ocurrido un error al eliminar el cliente");
    }
    return res.status(200).send("producto cliente"); 
    }
    
}

const clientesController = new ClientesController();

export default clientesController; 