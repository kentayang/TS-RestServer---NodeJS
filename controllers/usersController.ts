import { Request, Response } from "express";
import User from "../models/user";
import { Op } from "sequelize";

const getUsers = async (req: Request, res: Response)=>{
    const users = await User.findAll({
        where: {
            status: true
        }
    });

    res.json({users})
}

const getUser = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const user = await User.findByPk(id)
    if(!user){
        return res.status(404).json({msg: `El usuario con el id ${id} no existe`})
    }

    res.json({user})
}

const postUser = async (req: Request, res: Response)=>{
    const {body} = req;
    
    try {
        const emailExists = await User.findOne({
            where: {
                email: body.email
            }
        })
        if (emailExists){
            return res.status(400).json({
                msg: `El email ${body.email} ya existe.`
            })
        }

        const user = await User.create(body)
        res.json(user)
    } catch (error) {
        console.log((error as Error).message)
        res.status(500).json({
            msg: "Error al intentar crear un usuario."
        })
    }
}

const putUser = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const {body} = req;
    try {
        const user = await User.findByPk(id)
        if (!user){
            return res.status(404).json({
                msg: `No existe usuario con el id ${id}.`
            })
        }
        
        const emailExists = await User.findOne({
            where: {
                email: body.email,
                [Op.not]: {id}
            }
        })
        if (emailExists){
            return res.status(404).json({
                msg: `El email ${body.email} no se puede actualizar porque ya existe.`
            })
        }

        await user.update(body)
        res.json(user)
    } catch (error) {
        console.log((error as Error).message)
        res.status(500).json({
            msg: "Error al intentar actualizar un usuario."
        })
    }
}

const deleteUser = async (req: Request, res: Response)=>{
    const {id} = req.params;
    try {
        const user = await User.findByPk(id)
        if (!user){
            return res.status(404).json({
                msg: `No existe usuario con el id ${id}.`
            })
        }

        await user.update({status: false})
        res.json(user)
    } catch (error) {
        console.log((error as Error).message)
        res.status(500).json({
            msg: "Error al intentar actualizar un usuario."
        })
    }
}

export {
    getUsers, getUser, postUser, putUser, deleteUser
}