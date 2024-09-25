import type { Request, Response } from "express";
import Project from "../model/Project";
import colors from 'colors'

     class ProjectController {

         static createProject =  async (req : Request, res : Response) => {
            const project = new Project(req.body);
            try {
                await project.save()
                res.json(project);
            } catch (error) {
                 console.log(colors.red(error));                   
            }
           
        }

         static GetAllProjects =  async (req : Request, res : Response) => {
            try {
                const projects = await Project.find({});
                res.json(projects);
            } catch (error) {
                console.log(colors.red(error));
            }
        }
    };

export default ProjectController;