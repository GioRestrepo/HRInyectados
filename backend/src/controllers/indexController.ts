import {Request, Response} from "express";

class Indexcontroller {
    public index (req: Request, res: Response) {
        res.send("Hello")
    }
}

const indexcontroller = new Indexcontroller();
export default indexcontroller;