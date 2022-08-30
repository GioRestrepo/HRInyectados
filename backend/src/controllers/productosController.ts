import {Request, Response, text} from "express";


class ProductosController {
    public async read(req: Request, res: Response) {
          res.send("read producto ")

    }
    
    public async create (req: Request, res: Response): Promise<void>{
        
         res.send("Create producto")
        
    }
    public update (req: Request, res: Response){
        res.send("Update producto")
    }
    public delete (req: Request, res: Response){
        res.send("Delete producto") 
    }
    
}

const productosController = new ProductosController();

export default productosController; 