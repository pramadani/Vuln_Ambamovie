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
exports.MovieModel = void 0;
const dbConnection_1 = require("../config/dbConnection");
class MovieModel {
    static getMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM movies';
            const result = yield dbConnection_1.pool.query(query);
            return result.rows.map(row => ({
                id: row.id,
                title: row.title,
                poster: row.poster
            }));
        });
    }
    static getMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT * FROM movies 
            WHERE id = '${id}'
        `;
            const result = yield dbConnection_1.pool.query(query);
            if (result.rows.length === 0)
                throw new Error('Movie not found');
            return result.rows[0];
        });
    }
    static createMovie(title, overview, releaseDate, language, genres, poster) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO movies (title, overview, release_date, language, genres, poster)
            VALUES (${title}, ${overview}, ${releaseDate}, ${language}, ${genres}, ${poster})
        `;
            yield dbConnection_1.pool.query(query);
        });
    }
}
exports.MovieModel = MovieModel;
