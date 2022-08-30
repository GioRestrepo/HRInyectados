import {Request, Response, text} from "express";


class ClientesController {
    public async read(req: Request, res: Response) {
          res.send("read cliente ")

    }
    
    public async create (req: Request, res: Response): Promise<void>{
        
         res.send("Create cliente")
        
    }
    public update (req: Request, res: Response){
        res.send("Update cliente")
    }
    public delete (req: Request, res: Response){
        res.send("Delete cliente") 
    }
    
}

const clientesController = new ClientesController();

export default clientesController; 