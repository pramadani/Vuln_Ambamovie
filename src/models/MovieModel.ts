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
        const genresString = `{${genres.join(',')}}`;
        await pool.query(`INSERT INTO movies (title, overview, releaseDate, language, genres, poster) VALUES ('${title}', '${overview}', '${releaseDate}', '${language}', '${genresString}', '${poster}')`);
    }
    // static async getPoster(id: string) {
    //     try {
    //         const query = 'SELECT poster FROM movies WHERE id = $1';
    //         const result = await pool.query(query, [id]);

    //         if (result.rows.length === 0) {
    //             throw new Error('Film tidak ditemukan');
    //         }

    //         return result.rows[0].poster_path;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

}