import {Sequelize} from "sequelize";

const db = new Sequelize("tsrestserver","root","35P3r4n24", {
    host: "localhost",
    dialect: "mysql",
    logging: false
})

export default db;