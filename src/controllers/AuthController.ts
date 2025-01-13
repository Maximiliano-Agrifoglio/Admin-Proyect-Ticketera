import type { Request, Response } from "express";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        res.json({msj: 'pasaste las validaciones! usuario creado!'});
    }
}