import express from 'express';
import { MovieController } from '../controllers/MovieController';
import { SessionMiddleware } from '../middleware/SessionMiddleware';

const movieRouter = express.Router();

movieRouter.get('/',
    SessionMiddleware.authToken,
    MovieController.getMovies
);

movieRouter.get('/:id',
    SessionMiddleware.authToken,
    MovieController.getMovie
);

movieRouter.post('/',
    SessionMiddleware.authToken,
    SessionMiddleware.authRole,
    MovieController.createMovie
);

movieRouter.get('/poster/:id',
    SessionMiddleware.authToken,
    MovieController.getPoster
);

export default movieRouter;