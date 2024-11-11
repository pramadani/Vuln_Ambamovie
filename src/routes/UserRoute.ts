import express from 'express';
import { UserController } from '../controllers/UserController';
import { UserMiddleware } from '../middlewares/UserMiddleware';
import { SessionMiddleware } from '../middlewares/SessionMiddleware';
import { CryptMiddleware } from '../middlewares/CryptMiddleware';

const userRouter = express.Router();

userRouter.post('/register',
    UserMiddleware.validateEmail,
    UserMiddleware.validatePassword,
    CryptMiddleware.hashPassword,
    UserController.register
);

userRouter.post('/login',
    UserMiddleware.validateEmail,
    CryptMiddleware.hashPassword,
    UserController.login
);

userRouter.get('/user',
    SessionMiddleware.authToken,
    SessionMiddleware.authRole,
    UserController.getUser
);

export default userRouter;
