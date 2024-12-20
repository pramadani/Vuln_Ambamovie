import { Request, Response } from 'express';
import { MovieModel } from '../models/MovieModel';

export class MovieController {
    static async getMovies(req: Request, res: Response) {
        try {
            const movies = await MovieModel.getMovies();
            res.status(200).json(movies);
        } catch (error: any) {
            if (error?.code) {
                res.status(500).json({ message: 'Unknown error occurred' });
            } else {
                const err = error as Error;
                res.status(500).json({ message: err.message });
            }
        }
    }

    static async getMovie(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const movie = await MovieModel.getMovie(id);
            res.status(200).json(movie);
        } catch (error: any) {
            if (error?.code) {
                res.status(500).json({ message: 'Unknown error occurred' });
            } else {
                const err = error as Error;
                res.status(404).json({ message: err.message });
            }
        }
    }

    static async getPoster(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const imagePath = `src/assets/poster/${id}`;
            res.sendFile(imagePath, { root: '.' });
        } catch (error: any) {
            if (error?.code) {
                res.status(500).json({ message: 'Unknown error occurred' });
            } else {
                const err = error as Error;
                res.status(500).json({ message: err.message });
            }
        }
    }
}
