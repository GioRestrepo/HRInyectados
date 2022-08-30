import { Router } from "express";
import clientesController from "../controllers/clientesController"

class ClientesRoutes {
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get("/", clientesController.read ); 
        this.router.post("/", clientesController.create);
        this.router.put("/", clientesController.update);
        this.router.delete("/:id", clientesController.delete)
    }
}

const clientesRoutes = new ClientesRoutes();

export default  clientesRoutes.router; 