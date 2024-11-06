"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
class SessionMiddleware {
    static authToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
            if (!token) {
                res.status(401).json({ message: 'Access token is missing' });
                return;
            }
            jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decodedToken) => {
                if (err || !decodedToken) {
                    res.status(403).json({ message: 'Invalid token' });
                    return;
                }
                const decoded = decodedToken;
                req.body.user_id = decoded.user_id;
                req.body.role = decoded.role;
                next();
            });
        }
        catch (error) {
            const err = error;
            res.status(500).json({ message: err.message });
            return;
        }
    }
    static authRole(req, res, next) {
        try {
            const { user, role, user_id } = req.body;
            if (role === 'user') {
                req.body.user = user_id;
                next();
            }
            else if (role === 'admin') {
                if (!user) {
                    res.status(400).json({ message: 'Admin must have a user in the request body' });
                    return;
                }
                next();
            }
            else {
                res.status(400).json({ message: 'Role not recognized' });
                return;
            }
        }
        catch (error) {
            const err = error;
            res.status(500).json({ message: err.message });
            return;
        }
    }
}
exports.SessionMiddleware = SessionMiddleware;
