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

export interface MovieTitle {
    id: string;
    title: string;
    poster: string;
}

export class MovieModel {
    static async getMovies(): Promise<MovieTitle[]> {
        const query = 'SELECT id, title, poster FROM movies';
        const result = await pool.query(query);
        return result.rows;
    }

    static async getMovie(id: string): Promise<Movie> {
        const query = `
            SELECT 
                id,
                title,
                overview,
                TO_CHAR(release_date, 'YYYY-MM-DD') AS release_date,
                language,
                genres,
                poster
            FROM movies 
            WHERE id = '${id}'
        `;
        const result = await pool.query(query);
        if (result.rows.length === 0) throw new Error('Movie not found');
        return result.rows[0];
    }
}