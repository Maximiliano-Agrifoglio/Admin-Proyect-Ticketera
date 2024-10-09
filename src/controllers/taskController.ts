import type { Request, Response } from "express";
import Task from "../model/Task";
import colors from 'colors'

     class TaskController {

         static createTask =  async (req : Request, res : Response) => {
            
            try {            
                const task = new Task(req.body);
                task.project = req.project.id;
                req.project.tasks.push(task.id);
                await Promise.allSettled([task.save(),req.project.save()]);
                res.json(task);
            } catch (error) {
                 console.log(`exepción en createTask ${colors.red(error)}`);                   
            }
        }
    };

export default TaskController;