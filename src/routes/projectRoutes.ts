import { Router } from "express";
import ProjectController from "../controllers/projectController";
import TaskController from "../controllers/taskController";
import { body, param } from 'express-validator';
import handleImputsErrors from "../middleware/validation";
import validateProject from "../middleware/project";
import validateTask from "../middleware/task";

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

    // Ruotes for tasks.
    router.param('projectId', validateProject);
    router.param('taskId', validateTask);

    router.post('/:projectId/tasks',
         body('name')
        .notEmpty().withMessage('El Nombre de la Tarea es Obligatoria'),
         body('description')
        .notEmpty().withMessage('La Descripción de la Tarea es obligatoria'),
 handleImputsErrors,
 TaskController.createTask);

 router.get('/:projectId/tasks',
      TaskController.getProjectTasks
 );

 router.get('/:projectId/tasks/:taskId',
       param('taskId').isMongoId().withMessage('ID no valido'),
       handleImputsErrors,
       TaskController.getTaskById
);

 router.put('/:projectId/tasks/:taskId',
       param('taskId').isMongoId().withMessage('ID no valido'),
       body('name')
       .notEmpty().withMessage('El Nombre de la Tarea es Obligatoria'),
        body('description')
       .notEmpty().withMessage('La Descripción de la Tarea es obligatoria'),
       handleImputsErrors,
       TaskController.updateTaskById
);

 router.delete('/:projectId/tasks/:taskId',
       param('taskId').isMongoId().withMessage('ID no valido'),
       handleImputsErrors,
       TaskController.deleteTaskById
);
 router.patch('/:projectId/tasks/:taskId/status',
       param('taskId').isMongoId().withMessage('ID no valido'),
       body('status').notEmpty().withMessage('El estado es obligatorio'),
       handleImputsErrors,
       TaskController.updateStatus
);

export default router;
