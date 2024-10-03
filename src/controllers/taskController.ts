import type { Request, Response } from "express";
import Task from "../model/Task";
import colors from 'colors'

     class TaskController {

         static createTask =  async (req : Request, res : Response) => {
            const { projectId } = req.params;
            console.log(projectId);
            try {
                
            } catch (error) {
                 console.log(colors.red(error));                   
            }
        }
    };

export default TaskController;