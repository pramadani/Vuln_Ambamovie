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
exports.MovieController = void 0;
const MovieModel_1 = require("../models/MovieModel");
class MovieController {
    static getMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield MovieModel_1.MovieModel.getMovies();
                res.status(200).json(movies);
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    static getMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const movie = yield MovieModel_1.MovieModel.getMovie(id);
                res.status(200).json(movie);
            }
            catch (error) {
                const err = error;
                res.status(404).json({ message: err.message });
            }
        });
    }
    static createMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, overview, releaseDate, language, genres, poster } = req.body;
                yield MovieModel_1.MovieModel.createMovie(title, overview, releaseDate, language, genres, poster);
                res.status(201).json({ message: "Movie created" });
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    static getPoster(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const imagePath = `src/assets/poster/${id}`;
                res.sendFile(imagePath, { root: '.' });
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.MovieController = MovieController;
