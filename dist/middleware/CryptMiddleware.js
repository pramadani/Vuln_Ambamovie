"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptMiddleware = void 0;
const crypto_1 = __importDefault(require("crypto"));
class CryptMiddleware {
    static hashPassword(req, res, next) {
        try {
            if (req.body.password) {
                const password = req.body.password;
                const md5Password = crypto_1.default.createHash('md5')
                    .update(password)
                    .digest('hex');
                req.body.password = md5Password;
            }
            next();
        }
        catch (error) {
            const err = error;
            res.status(500).json({ message: err.message });
            return;
        }
        ;
    }
}
exports.CryptMiddleware = CryptMiddleware;
