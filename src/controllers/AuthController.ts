import type { Request, Response } from "express";
import User from "../model/User";
import {hashPassword, checkPassword} from "../utils/authHash";
import Token from "../model/Token";
import generateToken from "../utils/token";
import transporter from "../config/nodemailer";
import { AuthEmail } from "../emails/AuthEmails";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {

            const { password, email } = req.body;

            //Prevenir duplicados
            const userExists = await User.findOne({ email });
            if (userExists) {
                const error = new Error('El Usuario ya esta registrado');
                return res.status(409).json({ error: error.message });
            }

            //crea un usuario.
            const user = new User(req.body);

            //Hash Password
            user.password = await hashPassword(password)
            //Generar el token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;

            //enviar el email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            });

            await Promise.allSettled([user.save(), token.save()]);
            res.send('cuenta creada revisa tu email...');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }

    }

    static confirmAccount = async (req: Request, res: Response) => {

        try {
            const { token } = req.body;
            const tokenExists = await Token.findOne({ token });
            if (!tokenExists) {
                const error = new Error('Token no valido');
                return res.status(401).json({ error: error.message });
            }
            const user = await User.findById(tokenExists.user);
            user.confirmed = true;
            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
            res.send('Cuenta confirmada correctamente');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static login = async (req: Request, res: Response) => {

        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error('Usuario no encontrado');
                return res.status(404).json({ error: error.message });
            }

            if (!user.confirmed) {
                //Generar un nuevo token
                const token = new Token();
                token.token = generateToken();
                token.user = user.id;
                await token.save();

                //reenviar el email
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                });
                const error = new Error('La cuenta no ha sido confirmada, hemos enviado un e-mail de confirmación ');
                return res.status(401).json({ error: error.message });
            }
            
            //Revisar password
            const isPasswordCorrect = await checkPassword(password, user.password);
            if (!isPasswordCorrect) {
                const error = new Error('Contraseña incorrecta');
                return res.status(401).json({ error: error.message });
            }
            res.send('usuario autenticado!');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static requestConfirmCode = async (req: Request, res: Response) => {

        try {
            const { email } = req.body;

            //Usuario existe. 
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error('El usuario no esta registrado');
                return res.status(404).json({ error: error.message });
            }
            if (user.confirmed) {
                const error = new Error('El usuario ya esta confirmado');
                return res.status(403).json({ error: error.message });
            }
            
            //Generar el token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;

            //enviar el email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            });

            await Promise.allSettled([user.save(), token.save()]);
            res.send('Se envió un nuevo token a tu E-mail');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static forgotPassword = async (req: Request, res: Response) => {

        try {
            const { email } = req.body;

            //Usuario existe. 
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error('El usuario no esta registrado');
                return res.status(404).json({ error: error.message });
            }
            
            //Generar el token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;
            token.save();

            //enviar el email
            AuthEmail.sendPasswordResetToken({
                email: user.email,
                name: user.name,
                token: token.token
            });

            res.send('Revisa tu email para instrucciones');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }
}