import { Router } from "express";
import bodegaController from "../controllers/bodegaController"

class BodegaRoutes {
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get("/", bodegaController.read ); 
        this.router.post("/", bodegaController.create);
        this.router.put("/", bodegaController.update);
        this.router.delete("/:id", bodegaController.delete)
    }
}

const bodegaRoutes = new BodegaRoutes();

export default bodegaRoutes.router;  