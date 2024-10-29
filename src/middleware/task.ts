import type { Request, Response, NextFunction } from "express";
import { ITask } from "../model/Task";
import Task from "../model/Task";
import colors from 'colors';

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
};

 const validateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
            const error = new Error('Tarea no encontrada');
            return res.status(404).json({error: error.message});
        }
        req.task = task;
        next();
    } catch (error) {
        console.log(`exepción en validateTask ${colors.red(error)}`);
        res.status(500).json({error: 'Hubo un error'});              
    }
}

const taskBelongToProject = (req: Request, res: Response, next: NextFunction) => {
    if (req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error('Accion no valida');
        return res.status(400).json({error: error.message});
    } 
    next();
}
export {taskBelongToProject};
export default validateTask;