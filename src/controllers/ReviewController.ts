import { Request, Response } from 'express';
import { ReviewModel } from '../models/ReviewModel';

export class ReviewController {
    static async createReview(req: Request, res: Response) {
        try {
            const { user, movie, star, comment } = req.body;
            const review = await ReviewModel.createReview(user, movie, star, comment);
            res.status(201).json(review);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    static async getReviews(req: Request, res: Response) {
        try {
            const { movie } = req.params;
            const reviews = await ReviewModel.getReviews(movie);
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async updateReview(req: Request, res: Response) {
        try {
            const { user, movie, star, comment } = req.body;
            const review = await ReviewModel.updateReview(user, movie, star, comment);
            res.status(200).json(review);
        } catch (error) {
            res.status(404).json(error);
        }
    }

    static async deleteReview(req: Request, res: Response) {
        try {
            const { user, movie } = req.body;
            await ReviewModel.deleteReview(user, movie);
            res.status(204).send();
        } catch (error) {
            res.status(404).json(error);
        }
    }
}
