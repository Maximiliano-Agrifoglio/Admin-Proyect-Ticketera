import type { Request, Response } from "express";
import Task from "../model/Task";
import colors from 'colors'
import { trusted } from "mongoose";

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
                const { taskId } = req.params;
                const task = await Task.findById(taskId);
                if (!task) {
                    const error = new Error('Tarea no encontrada');
                    return res.status(404).json({error: error.message});
                } 
                if (task.project.toString() !== req.project.id) {
                    const error = new Error('Accion no valida');
                    return res.status(400).json({error: error.message});
                }    
                res.json(task);
            } catch (error) {
                 console.log(`exepción en getTaskByID => ${colors.red(error)}`);
                 res.status(500).json({error: 'Hubo un Error'});                   
            }
        }
        static updateTaskById = async (req : Request, res : Response) => {
            
            try {            
                const { taskId } = req.params;
                const task = await Task.findById(taskId);
                if (!task) {
                    const error = new Error('Tarea no encontrada');
                    return res.status(404).json({error: error.message});
                } 
                if (task.project.toString() !== req.project.id) {
                    const error = new Error('Accion no valida');
                    return res.status(400).json({error: error.message});
                }    
                task.name = req.body.name
                task.description = req.body.description
                await task.save();
                res.json(task);
            } catch (error) {
                 console.log(`exepción en updateTaskByID => ${colors.red(error)}`);
                 res.status(500).json({error: 'Hubo un Error'});                   
            }
        }

        static deleteTaskById = async (req : Request, res : Response) => {
            
            try {            
                const { taskId } = req.params;
                const task = await Task.findById(taskId);
                if (!task) {
                    const error = new Error('Tarea no encontrada');
                    return res.status(404).json({error: error.message});
                } 
                req.project.tasks = req.project.tasks.filter( task => task.toString() !== taskId )
                await Promise.allSettled([task.deleteOne(), req.project.save()]);
                res.send('Tarea Eliminada Correctamente');
            } catch (error) {
                 console.log(`exepción en updateTaskByID => ${colors.red(error)}`);
                 res.status(500).json({error: 'Hubo un Error'});                   
            }
        }
    };

export default TaskController;