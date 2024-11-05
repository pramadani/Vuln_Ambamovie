import express from 'express';
import { ReviewController } from '../controllers/ReviewController';

const reviewRouter = express.Router();

reviewRouter.post('/', ReviewController.createReview);
reviewRouter.get('/:movie', ReviewController.getReviews);
reviewRouter.put('/', ReviewController.updateReview);
reviewRouter.delete('/', ReviewController.deleteReview);

export default reviewRouter;