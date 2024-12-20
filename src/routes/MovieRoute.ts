import express from 'express';
import { MovieController } from '../controllers/MovieController';
import { SessionMiddleware } from '../middlewares/SessionMiddleware';

const movieRouter = express.Router();

movieRouter.get('/',
    SessionMiddleware.authToken,
    MovieController.getMovies
);

movieRouter.get('/:id',
    SessionMiddleware.authToken,
    MovieController.getMovie
);

movieRouter.get('/poster/:id',
    SessionMiddleware.authToken,
    MovieController.getPoster
);

export default movieRouter;