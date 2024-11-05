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
        id: string;
        name: string;
    };
}

export class ReviewModel {
    static async createReview(userId: string, movieId: string, star: number, comment: string) {
        await pool.query(`INSERT INTO reviews (user_id, movie_id, star, comment) VALUES ('${userId}', '${movieId}', ${star}, '${comment}')`);
    }

    static async getReviews(movieId: string): Promise<ReviewWithUser[]> {
        const result = await pool.query(`SELECT * FROM reviews WHERE movie_id = '${movieId}'`);
        return result.rows;
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