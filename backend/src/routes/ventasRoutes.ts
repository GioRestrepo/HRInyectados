import { Router } from "express";
import ventasController from "../controllers/ventasController"

class VentasRoutes {
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get("/", ventasController.read ); 
        this.router.post("/", ventasController.create);
        this.router.put("/", ventasController.update);
        this.router.delete("/:id", ventasController.delete)
    }
}

const ventasRoutes = new VentasRoutes();

export default ventasRoutes.router;  