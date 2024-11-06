import { Request, Response } from 'express';
import { ReviewModel } from '../models/ReviewModel';

export class ReviewController {
    static async createReview(req: Request, res: Response) {
        try {
            const { user, movie, star, comment } = req.body;
            await ReviewModel.createReview(user, movie, star, comment);
            res.status(201).json({ message: "Review created" });
        } catch (error) {
            const err = error as Error
            res.status(400).json({ message: err.message });
        }
    }

    static async getReviews(req: Request, res: Response) {
        try {
            const { movie } = req.params;
            const result = await ReviewModel.getReviews(movie);
            res.status(200).json(result);
        } catch (error) {
            const err = error as Error
            res.status(500).json({ message: err.message });
        }
    }

    static async updateReview(req: Request, res: Response) {
        try {
            const { user, movie, star, comment } = req.body;
            await ReviewModel.updateReview(user, movie, star, comment);
            res.status(200).json({ message: "Review updated" });
        } catch (error) {
            const err = error as Error
            res.status(404).json({ message: err.message });
        }
    }

    static async deleteReview(req: Request, res: Response) {
        try {
            const { user, movie } = req.body;
            await ReviewModel.deleteReview(user, movie);
            res.status(204).json({ message: "Review deleted" });
        } catch (error) {
            const err = error as Error
            res.status(404).json({ message: err.message });
        }
    }
}
