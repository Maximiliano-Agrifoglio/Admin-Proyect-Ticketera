import type { Request, Response } from "express";

     class ProjectController {

     static GetAllProyects =  async (req : Request, res : Response) => {
        res.send('Todos los proyectos..')
    }
};

export default ProjectController;