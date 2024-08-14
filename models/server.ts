import express, {Application} from "express"
import usersRoutes from "../routes/usersRoutes";
import cors from "cors";
import db from "../db/connection";

class Server{
    private app: Application;
    private port: string;
    private paths = {
        users: "/api/users"
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || "3000";

        this.dbConnection()
        this.middlewares()
        this.routes()
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log("Database online")
        } catch (error) {
            console.log((error as Error).message)
        }
    }
    
    middlewares(){
        //CORS
        this.app.use(cors())
        
        //Parseo del Body
        this.app.use(express.json())
        
        //Carpeta pública
        this.app.use(express.static("public"))
    }
    
    routes() {
        this.app.use(this.paths.users, usersRoutes )
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor escuchando en el puerto", this.port)
        })
    }
}

export default Server;