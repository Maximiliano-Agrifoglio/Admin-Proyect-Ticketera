import type { Request, Response } from "express";
import User from "../model/User";
import hashPassword from "../utils/authHash";
import Token from "../model/Token";
import generateToken from "../utils/token";

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
            //Generar el token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;
            await Promise.allSettled([user.save(), token.save()]);
            res.send('cuenta creada revisa tu email...');
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'});
        }

    }
}