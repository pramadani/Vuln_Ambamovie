import { pool } from '../config/dbConnection';

export interface Review {
    id: string;
    userId: number;
    movieId: string;
    star: number;
    comment: string;
}

export interface ReviewWithUser {
    id: string;
    userId: number;
    movieId: string;
    userName: string;
    star: number;
    comment: string;
}

export class ReviewModel {
    static async createReview(userId: string, movieId: string, star: number, comment: string) {
        const query = `
            INSERT INTO reviews (user_id, movie_id, star, comment) 
            VALUES ('${userId}', '${movieId}', ${star}, '${comment}')
        `;
        await pool.query(query);
    }

    static async getReviews(movieId: string): Promise<ReviewWithUser[]> {
        const query = `
            SELECT reviews.*, users.name 
            FROM reviews 
            JOIN users ON reviews.user_id = users.id 
            WHERE reviews.movie_id = '${movieId}'
        `;
        const result = await pool.query(query);
        return result.rows.map(row => ({
            id: row.id,
            userId: row.user_id,
            movieId: row.movie_id,
            userName: row.name,
            star: row.star,
            comment: row.comment
        }));
    }

    static async updateReview(userId: string, movieId: string, star: number, comment: string) {
        const query = `
            UPDATE reviews 
            SET star = ${star}, comment = '${comment}' 
            WHERE user_id = '${userId}' AND movie_id = '${movieId}' 
            RETURNING *
        `;
        const result = await pool.query(query);
        if (result.rows.length === 0) throw new Error('Review not found');
    }

    static async deleteReview(userId: string, movieId: string) {
        const query = `
            DELETE FROM reviews 
            WHERE user_id = '${userId}' AND movie_id = '${movieId}'
        `;
        const result = await pool.query(query);
        if (result.rowCount === 0) throw new Error('Review not found');
    }
}