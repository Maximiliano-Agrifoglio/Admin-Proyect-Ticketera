import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import handleImputsErrors from "../middleware/validation";
import { body } from "express-validator";

const router = Router();

router.post('/create-account',
        body('name')
             .notEmpty().withMessage('El nombre no puede ir vacio'),
        body('password')
             .isLength({min:8}).withMessage('El password debe contener 8 caracteres minimo'),
        body('password_confirmation').custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Los passwords no son iguales')
            }
            return true
        }),   
        body('email')
             .isEmail().withMessage('E-mail no válido'),
        handleImputsErrors,
        AuthController.createAccount
);

router.post('/confirm-account',
     body('token')
          .notEmpty().withMessage('El token no puede ir vacio'),
          handleImputsErrors,
          AuthController.confirmAccount
);

router.post('/login',
     body('email')
          .isEmail().withMessage('E-mail no válido'),
          handleImputsErrors,
          AuthController.login
);

export default router;