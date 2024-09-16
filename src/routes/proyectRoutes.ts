import { Router } from "express";
import ProjectController from "../controllers/proyectController";

const router = Router();

router.get('/', ProjectController.GetAllProyects );

export default router;