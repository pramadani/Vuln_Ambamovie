"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const dbConnection_1 = require("../config/dbConnection");
class ReviewModel {
    static createReview(userId, movieId, star, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO reviews (user_id, movie_id, star, comment) 
            VALUES ('${userId}', '${movieId}', ${star}, '${comment}')
        `;
            yield dbConnection_1.pool.query(query);
        });
    }
    static getReviews(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT reviews.*, users.name 
            FROM reviews 
            JOIN users ON reviews.user_id = users.id 
            WHERE reviews.movie_id = '${movieId}'
        `;
            const result = yield dbConnection_1.pool.query(query);
            return result.rows.map(row => ({
                id: row.id,
                userId: row.user_id,
                movieId: row.movie_id,
                userName: row.name,
                star: row.star,
                comment: row.comment
            }));
        });
    }
    static updateReview(userId, movieId, star, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE reviews 
            SET star = ${star}, comment = '${comment}' 
            WHERE user_id = '${userId}' AND movie_id = '${movieId}' 
            RETURNING *
        `;
            const result = yield dbConnection_1.pool.query(query);
            if (result.rows.length === 0)
                throw new Error('Review not found');
        });
    }
    static deleteReview(userId, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            DELETE FROM reviews 
            WHERE user_id = '${userId}' AND movie_id = '${movieId}'
        `;
            const result = yield dbConnection_1.pool.query(query);
            if (result.rows.length === 0)
                throw new Error('Review not found');
        });
    }
}
exports.ReviewModel = ReviewModel;
