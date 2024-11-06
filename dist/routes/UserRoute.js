"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const UserMiddleware_1 = require("../middleware/UserMiddleware");
const SessionMiddleware_1 = require("../middleware/SessionMiddleware");
const CryptMiddleware_1 = require("../middleware/CryptMiddleware");
const userRouter = express_1.default.Router();
userRouter.post('/register', UserMiddleware_1.UserMiddleware.validateEmail, UserMiddleware_1.UserMiddleware.validatePassword, CryptMiddleware_1.CryptMiddleware.hashPassword, UserController_1.UserController.register);
userRouter.post('/login', UserMiddleware_1.UserMiddleware.validateEmail, CryptMiddleware_1.CryptMiddleware.hashPassword, UserController_1.UserController.login);
userRouter.get('/user', SessionMiddleware_1.SessionMiddleware.authToken, SessionMiddleware_1.SessionMiddleware.authRole, UserController_1.UserController.login);
exports.default = userRouter;
