import express from 'express';
import { MovieController } from '../controllers/MovieController';
import { sessionMiddleware } from '../middleware/sessionMiddleware';

const movieRouter = express.Router();

movieRouter.get('/', sessionMiddleware, MovieController.getMovies);
movieRouter.get('/:id', sessionMiddleware, MovieController.getMovie);
movieRouter.post('/', MovieController.createMovie);
movieRouter.get('/poster/:id', sessionMiddleware, MovieController.getPoster)

export default movieRouter;