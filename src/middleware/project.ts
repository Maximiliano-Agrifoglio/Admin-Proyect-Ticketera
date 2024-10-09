import type { Request, Response, NextFunction } from "express";
import { IProject } from "../model/Project";
import Project from "../model/Project";
import colors from 'colors';

declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
};

 const validateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        if (!project) {
            const error = new Error('Proyecto no encontrado');
            return res.status(404).json({error: error.message});
        }
        req.project = project;
        next();
    } catch (error) {
        console.log(`exepción en validarteProject ${colors.red(error)}`);
        res.status(500).json({error: 'Hubo un error'});              
    }
}

export default validateProject;