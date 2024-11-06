import { pool } from '../config/dbConnection';

export interface Review {
    id: string;
    userId: string;
    movieId: string;
    star: number;
    comment: string;
}

export interface ReviewWithUser {
    id: string;
    userId: string;
    movieId: string;
    star: number;
    comment: string;
    user: {
        name: string;
    };
}

export class ReviewModel {
    static async createReview(userId: string, movieId: string, star: number, comment: string) {
        await pool.query(`INSERT INTO reviews (user_id, movie_id, star, comment) VALUES ('${userId}', '${movieId}', ${star}, '${comment}')`);
    }

    static async getReviews(movieId: string): Promise<ReviewWithUser[]> {
        const result = await pool.query(`
            SELECT reviews.*, users.name 
            FROM reviews 
            JOIN users ON reviews.user_id = users.id 
            WHERE reviews.movie_id = '${movieId}'
        `);

        return result.rows.map(row => ({
            id: row.id,
            userId: row.user_id,
            movieId: row.movie_id,
            star: row.star,
            comment: row.comment,
            user: {
                name: row.name
            }
        }));
    }

    static async updateReview(userId: string, movieId: string, star: number, comment: string) {
        const result = await pool.query(`UPDATE reviews SET star = ${star}, comment = '${comment}' WHERE user_id = '${userId}' AND movie_id = '${movieId}' RETURNING *`);
        if (result.rows.length === 0) throw new Error('Review not found');
    }

    static async deleteReview(userId: string, movieId: string) {
        const result = await pool.query(`DELETE FROM reviews WHERE user_id = '${userId}' AND movie_id = '${movieId}'`);
        if (result.rows.length === 0) throw new Error('Review not found');
    }
}