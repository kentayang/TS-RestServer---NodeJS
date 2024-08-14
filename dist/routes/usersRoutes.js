"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const usersRoutes = (0, express_1.Router)();
usersRoutes.get("/", usersController_1.getUsers);
usersRoutes.get("/:id", usersController_1.getUser);
usersRoutes.post("/", usersController_1.postUser);
usersRoutes.put("/:id", usersController_1.putUser);
usersRoutes.delete("/:id", usersController_1.deleteUser);
exports.default = usersRoutes;
//# sourceMappingURL=usersRoutes.js.map