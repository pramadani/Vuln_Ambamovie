import express from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { SessionMiddleware } from '../middlewares/SessionMiddleware';

const reviewRouter = express.Router();

reviewRouter.post('/',
    SessionMiddleware.authToken,
    SessionMiddleware.authRole,
    ReviewController.createReview
);

reviewRouter.get('/:movie',
    SessionMiddleware.authToken,
    ReviewController.getReviews
);

reviewRouter.put('/',
    SessionMiddleware.authToken,
    SessionMiddleware.authRole,
    ReviewController.updateReview
);

reviewRouter.delete('/',
    SessionMiddleware.authToken,
    SessionMiddleware.authRole,
    ReviewController.deleteReview
);

export default reviewRouter;