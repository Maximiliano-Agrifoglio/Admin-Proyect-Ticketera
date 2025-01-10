import { Router } from "express";

const router = Router();

router.get('/',(req, res) => {
    res.send('prueba de response');
});

export default router;