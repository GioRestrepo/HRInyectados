import { Router } from "express";
import usuariosController from "../controllers/usuariosController"
import auth from "../middleware/auth"

class UsuariosRoutes {
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get("/", auth, usuariosController.read ); 
        this.router.post("/", usuariosController.create);
        this.router.post("/login", usuariosController.login);
        this.router.put("/", auth, usuariosController.update);
        this.router.delete("/", auth, usuariosController.delete)
    }
}

const usuariosRoutes = new UsuariosRoutes();

export default usuariosRoutes.router;  