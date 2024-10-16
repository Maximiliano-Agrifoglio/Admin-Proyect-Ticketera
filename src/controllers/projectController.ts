import type { Request, Response } from "express";
import Project from "../model/Project";
import colors from 'colors'

     class ProjectController {

         static createProject =  async (req : Request, res : Response) => {
            const project = new Project(req.body);
            try {
                await project.save()
                res.json({ msg:'Proyecto Creado correctamente!'});
            } catch (error) {
                console.log(`Error: ${colors.red(error)}`);                   
            }
           
        }

         static GetAllProjects =  async (req : Request, res : Response) => {
            try {
                const projects = await Project.find({});
                res.json(projects);
            } catch (error) {
                console.log(`Error: ${colors.red(error)}`);
            }
        }

        static getProjectByid =  async (req : Request, res : Response) => {
            const { id } = req.params;
            try {
                const project = await Project.findById(id);
                if (!project) {
                    const error = new Error('Proyecto no encontrado');
                    return res.status(404).json({error: error.message});
                }  
                const populatedProject = await Project.populate(project, { path: 'tasks' });
                res.json(populatedProject);
            } catch (error) {
                console.log(`Error: ${colors.red(error)}`);
                res.status(500).json({error: 'Hubo un Error'});
            }
        }

        static updateProject =  async (req : Request, res : Response) => {
            const { id } = req.params;
            try {
                const project = await Project.findByIdAndUpdate(id, req.body);
                if (!project) {
                    const error = new Error('Proyecto no encontrado');
                    return res.status(404).json({error: error.message});
                }
                await project.save();
                res.json(project);
            } catch (error) {
                console.log(`Error: ${colors.red(error)}`);
            }
        }

        static deleteProject =  async (req : Request, res : Response) => {
            const { id } = req.params;
            try {
                const project = await Project.findById(id);
                if (!project) {
                    const error = new Error('Proyecto no encontrado');
                    return res.status(404).json({error: error.message});
                }
                await project.deleteOne();
                res.json({msg:'Proyecto eliminado correctamente'});
            } catch (error) {
                console.log(`Error: ${colors.red(error)}`);
            }
        }
    };

export default ProjectController;

  