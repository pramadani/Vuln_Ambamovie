import { Request, Response } from 'express';
import { MovieModel } from '../models/MovieModel';

export class MovieController {
    static async getMovies(req: Request, res: Response) {
        try {
            const movies = await MovieModel.getMovies();
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getMovie(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const movie = await MovieModel.getMovie(id);
            res.status(200).json(movie);
        } catch (error) {
            res.status(404).json(error);
        }
    }

    static async createMovie(req: Request, res: Response) {
        try {
            const { title, overview, releaseDate, language, genres, poster } = req.body;
            const newMovie = await MovieModel.createMovie(title, overview, releaseDate, language, genres, poster);
            res.status(201).json(newMovie);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getPoster(req: Request, res: Response) {
        try {
            const { id } = req.params;
            // const poster = await MovieModel.getPoster(id);
            
            // Path lengkap ke file gambar
            console.log()
            const imagePath = `src/assets/images/${id}`; // Sesuaikan dengan folder tempat Anda menyimpan gambar

            // Mengirim gambar sebagai file
            res.sendFile(imagePath, { root: '.' }, (err) => {
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    }

}
