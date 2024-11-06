"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MovieController_1 = require("../controllers/MovieController");
const SessionMiddleware_1 = require("../middleware/SessionMiddleware");
const movieRouter = express_1.default.Router();
movieRouter.get('/', SessionMiddleware_1.SessionMiddleware.authToken, MovieController_1.MovieController.getMovies);
movieRouter.get('/:id', SessionMiddleware_1.SessionMiddleware.authToken, MovieController_1.MovieController.getMovie);
movieRouter.post('/', SessionMiddleware_1.SessionMiddleware.authToken, SessionMiddleware_1.SessionMiddleware.authRole, MovieController_1.MovieController.createMovie);
movieRouter.get('/poster/:id', SessionMiddleware_1.SessionMiddleware.authToken, MovieController_1.MovieController.getPoster);
exports.default = movieRouter;
