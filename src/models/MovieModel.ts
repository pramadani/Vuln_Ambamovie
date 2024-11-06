import { pool } from "../config/dbConnection";

export interface Movie {
    id: string;
    title: string;
    overview: string;
    releaseDate: string;
    language: string;
    genres: string[];
    poster: string;
}

export class MovieModel {
    static async getMovies(): Promise<Movie[]> {
        const result = await pool.query('SELECT * FROM movies');
        return result.rows;
    }

    static async getMovie(id: string): Promise<Movie> {
        const result = await pool.query(`SELECT * FROM movies WHERE id = '${id}'`);
        if (result.rows.length === 0) throw new Error('Movie not found');
        return result.rows[0];
    }

    static async createMovie(
        title: string, 
        overview: string, 
        releaseDate: string, 
        language: string, 
        genres: string[], 
        poster: string
    ) {
        const query = `
            INSERT INTO movies (title, overview, release_date, language, genres, poster)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        
        const genresString = genres;
        await pool.query(query, [title, overview, releaseDate, language, genresString, poster]);
    }
}