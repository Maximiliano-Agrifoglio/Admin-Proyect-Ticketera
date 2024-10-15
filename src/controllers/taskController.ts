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
                 console.log(res.status(500).json({error: 'Hubo un Error'}));
            }
        }

        static getProjectTasks = async (req : Request, res : Response) => {
            
            try {            
                const tasks = await Task.find({project: req.project.id}).populate('project');
                res.json(tasks);
            } catch (error) {
                 console.log(`exepción en getProjectTasks ${colors.red(error)}`);
                 res.status(500).json({error: 'Hubo un Error'});                   
            }
        }
    };

export default TaskController;