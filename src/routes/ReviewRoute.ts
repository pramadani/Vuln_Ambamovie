import express from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { sessionMiddleware } from '../middleware/sessionMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';

const reviewRouter = express.Router();

reviewRouter.post('/', sessionMiddleware, roleMiddleware, ReviewController.createReview);
reviewRouter.get('/:movie', sessionMiddleware, ReviewController.getReviews);
reviewRouter.put('/', sessionMiddleware, roleMiddleware, ReviewController.updateReview);
reviewRouter.delete('/', sessionMiddleware, roleMiddleware, ReviewController.deleteReview);

export default reviewRouter;