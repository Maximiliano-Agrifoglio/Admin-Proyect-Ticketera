import { Router } from "express";
import ProjectController from "../controllers/projectController";
import { body, param } from 'express-validator';
import handleImputsErrors from "../middleware/validation";

const router = Router();

router.post('/',
          body('projectName')
         .notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
          body('clientName')
         .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
          body('description')
         .notEmpty().withMessage('La Descripción del Proyecto es Obligatoria'),

     handleImputsErrors,
     ProjectController.createProject);
     
router.get('/', ProjectController.GetAllProjects );

router.get('/:id',
       param('id').isMongoId().withMessage('ID no valido'),
       handleImputsErrors,
       ProjectController.getProjectByid);

router.put('/:id',
         param('id').isMongoId().withMessage('ID no valido'),
         body('projectName')
        .notEmpty().withMessage('El Nombre del Proyecto es Obligatorio'),
         body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es Obligatorio'),
         body('description')
        .notEmpty().withMessage('La Descripción del Proyecto es Obligatoria'),
 handleImputsErrors,
 ProjectController.updateProject);

 router.delete('/:id',
    param('id').isMongoId().withMessage('ID no valido'),
    handleImputsErrors,
    ProjectController.deleteProject);

export default router;