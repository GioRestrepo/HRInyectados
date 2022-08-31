import express, {Application} from "express";
import morgan from "morgan";
import cors from "cors";

import indexRoutes from "./routes/indexRoutes";
import usuariosRoutes from "./routes/usuariosRoutes";
import clientesRoutes from "./routes/clientesRoutes";
import bodegasRoutes from "./routes/bodegaRoutes";
import productosRoutes from "./routes/productosRoutes";
import ventasRoutes from "./routes/ventasRoutes";
import database from "./database";

import Usuario from "./models/usuariosModel";

class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
          this.app.set("port", process.env.PORT || 3000);
          this.app.use(morgan("dev"));
          this.app.use(cors());
          this.app.use(express.json())
          this.app.use(express.urlencoded({extended: false}));   
    }
    routes(): void{
        this.app.use("/", indexRoutes);
        this.app.use("/api/usuarios", usuariosRoutes)
        this.app.use("/api/clientes", clientesRoutes);
        this.app.use("/api/bodegas", bodegasRoutes);
        this.app.use("/api/productos", productosRoutes);
        this.app.use("/api/ventas", ventasRoutes);
    }

    start(): void{
        this.app.listen(this.app.get("port"), ()=>{
            console.log("SERVER ON PORT", this.app.get("port"));
        })
        database.dbConnection();
    }
}

const server = new Server();
server.start(); 