import {Request, Response, text} from "express";


class VentasController {
    public async read(req: Request, res: Response) {
          res.send("read venta ")

    }
    
    public async create (req: Request, res: Response): Promise<void>{
        
         res.send("Create venta")
        
    }
    public update (req: Request, res: Response){
        res.send("Update venta")
    }
    public delete (req: Request, res: Response){
        res.send("Delete venta") 
    }
    
}

const ventasController = new VentasController();

export default ventasController; 