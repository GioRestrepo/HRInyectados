import { Router } from "express";
import gamecontroller from "../controllers/gamesController"

class GamesRoutes {
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        // this.router.get("/", gamecontroller.list );
        // this.router.get("/:id", gamecontroller.getOne);
        // this.router.post("/", gamecontroller.create);
        // this.router.put("/", gamecontroller.update);
        // this.router.delete("/:id", gamecontroller.delate)
    }
}

const gamesRoutes = new GamesRoutes();

export default gamesRoutes.router;  