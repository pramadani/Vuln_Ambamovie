import express from 'express';
import { MovieController } from '../controllers/MovieController';

const movieRouter = express.Router();

movieRouter.get('/', MovieController.getMovies);
movieRouter.get('/:id', MovieController.getMovie);
movieRouter.post('/', MovieController.createMovie);
movieRouter.get('/images/:id', MovieController.getPoster)

export default movieRouter;