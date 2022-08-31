import { Request, Response } from "express";
import UsuarioModel from "../models/usuariosModel";

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
              email: req.params["id"],
            },
          })
        : await UsuarioModel.findAll();
    if (!usuarios || usuarios.length == 0)
      return res
        .status(500)
        .send("Ha ocurrido un error al consultar los usuarios");
    return res.status(200).send(usuarios);
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

    let user = UsuarioModel.build({
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
