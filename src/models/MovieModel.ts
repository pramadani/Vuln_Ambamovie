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
        const query = 'SELECT * FROM movies';
        const result = await pool.query(query);
        return result.rows.map(row => ({
            id: row.id,
            title: row.title,
            poster: row.poster
        }));
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

        const values = [
            title,
            overview,
            releaseDate,
            language,
            genres,
            poster
        ];

        await pool.query(query, values);
    }
}