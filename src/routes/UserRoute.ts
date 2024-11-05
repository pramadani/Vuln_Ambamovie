import express from 'express';
import { UserController } from '../controllers/UserController';

const userRouter = express.Router();

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);

export default userRouter;
