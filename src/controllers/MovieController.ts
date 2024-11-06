import { Request, Response } from 'express';
import { MovieModel } from '../models/MovieModel';

export class MovieController {
    static async getMovies(req: Request, res: Response) {
        try {
            const movies = await MovieModel.getMovies();
            res.status(200).json(movies);
        } catch (error) {
            const err = error as Error
            res.status(500).json({ message: err.message });
        }
    }

    static async getMovie(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const movie = await MovieModel.getMovie(id);
            res.status(200).json(movie);
        } catch (error) {
            const err = error as Error
            res.status(404).json({ message: err.message });
        }
    }

    static async createMovie(req: Request, res: Response) {
        try {
            const { title, overview, releaseDate, language, genres, poster } = req.body;
            await MovieModel.createMovie(title, overview, releaseDate, language, genres, poster);
            res.status(201).json({ message: "Movie created" });
        } catch (error) {
            const err = error as Error
            res.status(500).json({ message: err.message });
        }
    }

    static async getPoster(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const imagePath = `src/assets/poster/${id}`;
            res.sendFile(imagePath, { root: '.' });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    }

}
