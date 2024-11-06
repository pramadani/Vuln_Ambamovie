"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReviewController_1 = require("../controllers/ReviewController");
const SessionMiddleware_1 = require("../middleware/SessionMiddleware");
const reviewRouter = express_1.default.Router();
reviewRouter.post('/', SessionMiddleware_1.SessionMiddleware.authToken, SessionMiddleware_1.SessionMiddleware.authRole, ReviewController_1.ReviewController.createReview);
reviewRouter.get('/:movie', SessionMiddleware_1.SessionMiddleware.authToken, ReviewController_1.ReviewController.getReviews);
reviewRouter.put('/', SessionMiddleware_1.SessionMiddleware.authToken, SessionMiddleware_1.SessionMiddleware.authRole, ReviewController_1.ReviewController.updateReview);
reviewRouter.delete('/', SessionMiddleware_1.SessionMiddleware.authToken, SessionMiddleware_1.SessionMiddleware.authRole, ReviewController_1.ReviewController.deleteReview);
exports.default = reviewRouter;
