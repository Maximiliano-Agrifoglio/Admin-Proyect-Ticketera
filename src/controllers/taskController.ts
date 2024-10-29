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
                 console.log(`exepción en createTask => ${colors.red(error)}`);
                 console.log(res.status(500).json({error: 'Hubo un Error'}));
            }
        }

        static getProjectTasks = async (req : Request, res : Response) => {
            
            try {            
                const tasks = await Task.find({project: req.project.id}).populate('project');
                res.json(tasks);
            } catch (error) {
                 console.log(`exepción en getProjectTasks => ${colors.red(error)}`);
                 res.status(500).json({error: 'Hubo un Error'});                   
            }
        }

        static getTaskById = async (req : Request, res : Response) => {

            try {               
                res.json(req.task);
            } catch (error) {
                 console.log(`exepción en getTaskByID => ${colors.red(error)}`);
                 res.status(500).json({error: 'Hubo un Error'});                   
            }
        }
        static updateTaskById = async (req : Request, res : Response) => {
            
            try {               
                req.task.name = req.body.name
                req.task.description = req.body.description
                await req.task.save();
                res.json(req.task);
            } catch (error) {
                 console.log(`exepción en updateTaskByID => ${colors.red(error)}`);
                 res.status(500).json({error: 'Hubo un Error'});                   
            }
        }

        static deleteTaskById = async (req : Request, res : Response) => {
            
            try {            
                req.project.tasks = req.project.tasks.filter( task => task.toString() !== req.task.id.toString())
                await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
                res.json({message: 'Tarea eliminada correctamente'});
            } catch (error) {
                 console.log(`exepción en DeleteTaskByID => ${colors.red(error)}`);
                 res.status(500).json({error: 'Hubo un Error'});                   
            }
        }

        static updateStatus = async (req : Request, res : Response) => {
            
            try {            
                const { status } = req.body;
                req.task.status = status
                await req.task.save();
                res.json({message: 'Estado modificado correctamente'});
            } catch (error) {
                 console.log(`exepción en updateStatus => ${colors.red(error)}`);
                 res.status(500).json({error: 'Hubo un Error'});                   
            }
        }
    };

export default TaskController;