import {Request, Response, text} from "express";
import pool from "../database"

class GamesController {
    // public async list(req: Request, res: Response) {
    //     const games = await pool.query("SELECT * FROM games");
    //     res.json(games)
    // }
    // public getOne(req: Request, res: Response) {
    //     res.json({text: "Get one game" + req.params.id})
    // }
    // public async create (req: Request, res: Response): Promise<void>{
    //     const result = await pool.query("INSERT INTO games set ?", [req.body])
        
    //     res.json({message: "Game saved"}) 
    // }
    // public update (req: Request, res: Response){
    //     res.json({text: "updating a game" + req.params.id}) 
    // }
    // public delate (req: Request, res: Response){
    //     res.json({text: "delate a game" + req.params.id}) 
    // }
    
}

const gamesController = new GamesController();

export default gamesController; 