import {Request, Response, text} from "express";


class UsuariosController {
    public async read(req: Request, res: Response) {
          res.send("read user ")

    }
    
    public async create (req: Request, res: Response): Promise<void>{
        
         res.send("Create user")
        
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