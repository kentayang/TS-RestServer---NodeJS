"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("tsrestserver", "root", "35P3r4n24", {
    host: "localhost",
    dialect: "mysql",
    //logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map