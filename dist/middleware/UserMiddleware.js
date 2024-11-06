"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const zod_1 = require("zod");
const emailSchema = zod_1.z.string()
    .email({ message: 'Invalid email format' });
const passwordSchema = zod_1.z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[!@#$%^&*]/, { message: 'Password must contain at least one special character' });
class UserMiddleware {
    static validateEmail(req, res, next) {
        try {
            const { email } = req.body;
            emailSchema.parse(email);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({ message: error.errors.map(e => e.message) });
                return;
            }
            else {
                const err = error;
                res.status(500).json({ message: err.message });
                return;
            }
        }
    }
    static validatePassword(req, res, next) {
        try {
            const { password } = req.body;
            passwordSchema.parse(password);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({ message: error.errors.map(e => e.message) });
                return;
            }
            else {
                const err = error;
                res.status(500).json({ message: err.message });
                return;
            }
        }
    }
}
exports.UserMiddleware = UserMiddleware;
