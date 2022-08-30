import {Request, Response } from "express";
import UsuarioModel from "../models/usuariosModel";


class UsuariosController {
    public async read(req: Request, res: Response, next: any) {
      res.send("read user")
    }
    
    public async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>>{
      if(
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
        password: req.body.password
      })

      try {
        await user.save();
      } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error al guardar en la base de datos");
      }

      return res.send(user);
    }
    public update (req: Request, res: Response){
      res.send("Update usuario")
    }
    public delete (req: Request, res: Response){
      res.send("Delete usuario") 
    }
    
}

const usuariosController = new UsuariosController();

export default usuariosController; 