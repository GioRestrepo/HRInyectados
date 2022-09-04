import { Request, Response } from "express";
import { Op } from "sequelize";
import UsuarioModel from "../models/usuariosModel";
import bcrypt from "bcrypt";

class UsuariosController {
  public async read(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    let usuario = await UsuarioModel.findOne({
            where: {
              [Op.or]: [
                {id: req.body.payload.id},
                {email: req.body.payload.email}
              ]
            },
          });
    if (!usuario)
      return res
        .status(500)
        .send("Ha ocurrido un error al consultar los usuarios");
    return res.status(200).send({
      id: usuario.id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      email: usuario.email,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt
    });
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

    let tempUser =  await UsuarioModel.findOne({
      where: {
        email: req.body.email
      }
    });
    if(!!tempUser) return res.status(400).send("El usuario indicado ya se encuetra registrado");

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
      !req.body.password
    )
      return res.status(400).send("Todos los campos son obligatorios");

    let usuarioExistente = await UsuarioModel.findOne({
      where: {
        id: req.body.payload.id,
      },
    });
    console.log(usuarioExistente);
    
    if (!usuarioExistente)
      return res.status(400).send("El usuario indicado no existe");

    let hash = await bcrypt.hash(req.body.password, 10);
    let user = usuarioExistente;
    user.set({
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
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  }
  public async delete(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    let usuarioExistente = await UsuarioModel.findOne({
      where: {
        id: req.body.payload.id,
      },
    });
    if (!usuarioExistente)
      return res.status(400).send("El usuario indicado no existe");

    const user = usuarioExistente;

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
