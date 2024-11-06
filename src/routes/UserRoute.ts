import express from 'express';
import { UserController } from '../controllers/UserController';
import { hashMiddleware } from '../middleware/hashMiddleware';
import { sessionMiddleware } from '../middleware/sessionMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { passMiddleware } from '../middleware/passMiddleware';
import { emailMiddleware } from '../middleware/emailMiddleware';

const userRouter = express.Router();

userRouter.post('/register', emailMiddleware, passMiddleware, hashMiddleware, UserController.register);
userRouter.post('/login', emailMiddleware, hashMiddleware, UserController.login);
userRouter.get('/user', sessionMiddleware, roleMiddleware, UserController.login);

export default userRouter;
