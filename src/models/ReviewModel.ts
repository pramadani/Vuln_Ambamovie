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
    userName: string;
    star: number;
    comment: string;
}

export class ReviewModel {
    static async createReview(userId: string, movieId: string, star: number, comment: string) {
        const checkQuery = `
            SELECT 1 FROM reviews 
            WHERE user_id = $1 AND movie_id = $2 
            LIMIT 1
        `;
        
        const result = await pool.query(checkQuery);
        
        if (result.rows.length > 0) {
            throw new Error('Review already exists');
        }
    
        const insertQuery = `
            INSERT INTO reviews (user_id, movie_id, star, comment) 
            VALUES ($1, $2, $3, $4)
        `;
        
        await pool.query(insertQuery, [userId, movieId, star, comment]);
    }

    static async getReviews(movieId: string): Promise<ReviewWithUser[]> {
        const query = `
            SELECT reviews.*, users.name 
            FROM reviews 
            JOIN users ON reviews.user_id = users.id 
            WHERE reviews.movie_id = $1
        `;
        const result = await pool.query(query, [movieId]);
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
            SET star = $3, comment = $4 
            WHERE user_id = $1 AND movie_id = $2 
            RETURNING *
        `;
        const result = await pool.query(query, [star, comment, userId, movieId]);
        if (result.rows.length === 0) throw new Error('Review not found');
    }

    static async deleteReview(userId: string, movieId: string) {
        const query = `
            DELETE FROM reviews 
            WHERE user_id = $1 AND movie_id = $2
        `;
        const result = await pool.query(query, [userId, movieId]);
        if (result.rowCount === 0) throw new Error('Review not found');
    }
}