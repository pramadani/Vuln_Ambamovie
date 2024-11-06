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
exports.ReviewController = void 0;
const ReviewModel_1 = require("../models/ReviewModel");
class ReviewController {
    static createReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, movie, star, comment } = req.body;
                yield ReviewModel_1.ReviewModel.createReview(user, movie, star, comment);
                res.status(201).json({ message: "Review created" });
            }
            catch (error) {
                const err = error;
                res.status(400).json({ message: err.message });
            }
        });
    }
    static getReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { movie } = req.params;
                const result = yield ReviewModel_1.ReviewModel.getReviews(movie);
                res.status(200).json(result);
            }
            catch (error) {
                const err = error;
                res.status(500).json({ message: err.message });
            }
        });
    }
    static updateReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, movie, star, comment } = req.body;
                yield ReviewModel_1.ReviewModel.updateReview(user, movie, star, comment);
                res.status(200).json({ message: "Review updated" });
            }
            catch (error) {
                const err = error;
                res.status(404).json({ message: err.message });
            }
        });
    }
    static deleteReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, movie } = req.body;
                yield ReviewModel_1.ReviewModel.deleteReview(user, movie);
                res.status(204).json({ message: "Review deleted" });
            }
            catch (error) {
                const err = error;
                res.status(404).json({ message: err.message });
            }
        });
    }
}
exports.ReviewController = ReviewController;
