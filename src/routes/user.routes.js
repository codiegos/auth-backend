import {Router} from 'express'
import { methods as UserController } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth";
const router = Router();


router.post("/login",UserController.login);
router.post('/register', UserController.register);
router.get("/user",authMiddleware,UserController.user);

export default router;
