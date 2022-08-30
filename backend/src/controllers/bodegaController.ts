import {Request, Response, text} from "express";


class BodegaController {
    public async read(req: Request, res: Response) {
          res.send("read bodega ")

    }
    
    public async create (req: Request, res: Response): Promise<void>{
        
         res.send("Create bodega")
        
    }
    public update (req: Request, res: Response){
        res.send("Update bodega")
    }
    public delete (req: Request, res: Response){
        res.send("Delete bodega") 
    }
    
}

const bodegaController = new BodegaController();

export default bodegaController; 