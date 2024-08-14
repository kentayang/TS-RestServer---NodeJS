"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const sequelize_1 = require("sequelize");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll({
        where: {
            status: true
        }
    });
    res.json({ users });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({ msg: `El usuario con el id ${id} no existe` });
    }
    res.json({ user });
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailExists = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (emailExists) {
            return res.status(400).json({
                msg: `El email ${body.email} ya existe.`
            });
        }
        const user = yield user_1.default.create(body);
        res.json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: "Error al intentar crear un usuario."
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `No existe usuario con el id ${id}.`
            });
        }
        const emailExists = yield user_1.default.findOne({
            where: {
                email: body.email,
                [sequelize_1.Op.not]: { id }
            }
        });
        if (emailExists) {
            return res.status(404).json({
                msg: `El email ${body.email} no se puede actualizar porque ya existe.`
            });
        }
        yield user.update(body);
        res.json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: "Error al intentar actualizar un usuario."
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `No existe usuario con el id ${id}.`
            });
        }
        yield user.update({ status: false });
        res.json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: "Error al intentar actualizar un usuario."
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=usersController.js.map