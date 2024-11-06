import express from 'express';
import { UserController } from '../controllers/UserController';
import { UserMiddleware } from '../middleware/UserMiddleware';
import { SessionMiddleware } from '../middleware/SessionMiddleware';
import { CryptMiddleware } from '../middleware/CryptMiddleware';

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
    UserController.login
);

export default userRouter;
