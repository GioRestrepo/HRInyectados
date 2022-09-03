import { Request, Response } from "express";
import { Op } from "sequelize";
import UsuarioModel from "../models/usuariosModel";
import bcrypt from "bcrypt";

class UsuariosController {
  public async read(
    req: Request,
    res: Response,
    next: any
  ): Promise<Response<any, Record<string, any>>> {
    let usuarios =
      req.params["id"] != undefined
        ? await UsuarioModel.findAll({
            where: {
              [Op.or]: [
                {id: req.params["id"]},
                {email: req.params["id"]}
              ]
            },
          })
        : await UsuarioModel.findAll();
    if (!usuarios || usuarios.length == 0)
      return res
        .status(500)
        .send("Ha ocurrido un error al consultar los usuarios");
    return res.status(200).send(usuarios);
  }

  public async login(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>>{
    if(!req.body.email || !req.body.password)
      return res.status(400).send("Debes enviar todos los campos correctamente");

    let user = await UsuarioModel.findOne({ 
      where:{
        email: req.body.email
      }
    });
    if (!user) return res.status(400).send("Wrong email or password");
    
    //if (!user.dbStatus) return res.status(400).send("Wrong email or password");
    
    let hash = await bcrypt.compare(req.body.password, user.getDataValue('password'));
    if (!hash) return res.status(400).send("Wrong email or password");
    
    try {
      let jwtToken = user.generateJwt();
      return res.status(200).send({ jwtToken });
    } catch (e) {
      return res.status(400).send("Login error");
    }
  }

  public async create(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    if (
      !req.body.nombre ||
      !req.body.apellidos ||
      !req.body.email ||
      !req.body.password
    )
      return res.status(400).send("Todos los campos son obligatorios");

    let hash = await bcrypt.hash(req.body.password, 10);

    let user = UsuarioModel.build({
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      password: hash,
    });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Ha ocurrido un error al guardar en la base de datos");
    }

    return res.status(201).send({
      id: user.id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email
    });
  }
  public async update(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    if (
      !req.body.nombre ||
      !req.body.apellidos ||
      !req.body.email ||
      !req.body.password ||
      !req.params["id"]
    )
      return res.status(400).send("Todos los campos son obligatorios");

    let usuarioExistente = await UsuarioModel.findAll({
      where: {
        id: req.params["id"],
      },
    });
    if (!usuarioExistente || usuarioExistente.length == 0)
      return res.status(400).send("El usuario indicado no existe");

    let user = usuarioExistente[0];
    user.set({
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Ha ocurrido un error al guardar en la base de datos");
    }

    return res.status(201).send(user);
  }
  public async delete(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    if (!req.params["id"])
      return res
        .status(400)
        .send("El id del usuario a eliminar es obligatorio");

    let usuarioExistente = await UsuarioModel.findAll({
      where: {
        id: req.params["id"],
      },
    });
    if (!usuarioExistente || usuarioExistente.length == 0)
      return res.status(400).send("El usuario indicado no existe");

    const user = usuarioExistente[0];

    try {
      await user.destroy();
    } catch (error) {
      return res.send(500).send("Ha ocurrido un error al eliminar el usuario");
    }
    return res.status(200).send("Usuario Eliminado");
  }
}

const usuariosController = new UsuariosController();

export default usuariosController;
