import express from 'express';
import { UserController } from '../controllers/UserController';
import { SessionMiddleware } from '../middlewares/SessionMiddleware';
import { CryptMiddleware } from '../middlewares/CryptMiddleware';
import { UserMiddleware } from '../middlewares/UserMiddleware';

const userRouter = express.Router();

userRouter.post('/register',
    UserMiddleware.validateEmail,
    UserMiddleware.validatePassword,
    CryptMiddleware.hashPassword,
    UserController.register
);

userRouter.post('/login',
    CryptMiddleware.hashPassword,
    UserMiddleware.validateEmail,
    UserController.login
);

userRouter.get('/user',
    SessionMiddleware.authToken,
    SessionMiddleware.authRole,
    UserController.getUser
);

export default userRouter;
