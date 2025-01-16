import type { Request, Response } from "express";
import User from "../model/User";
import bcrytp from 'bcrypt'; 
import hashPassword from "../utils/authHash";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {

            const {password, email} = req.body;

            //Prevenir duplicados
            const userExists = await User.findOne({email});
            if (userExists) {
                const error = new Error('El Usuario ya esta registrado');
                return res.status(409).json({error: error.message});
            }
            
            //crea un usuario.
            const user = new User(req.body);

            //Hash Password
            user.password = await hashPassword(password)
            await user.save();
            res.send('cuenta creada revisa tu email...');
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'});
        }

    }
}