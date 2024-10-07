import type { Request, Response } from "express";
import Task from "../model/Task";
import colors from 'colors'
import Project from "../model/Project";

     class TaskController {

         static createTask =  async (req : Request, res : Response) => {
            
            try {
                const { projectId } = req.params;
                const project = await Project.findById(projectId);
             if (!project) {
                const error = new Error('Proyecto no encontrado');
                return res.status(404).json({error: error.message});
            }
                const task = new Task(req.body);
                task.project = project.id;
                project.tasks.push(task.id);
                await task.save();
                await project.save();
                res.json(task);
            } catch (error) {
                 console.log(`exepción en createTask ${colors.red(error)}`);                   
            }
        }
    };

export default TaskController;