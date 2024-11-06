import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const emailSchema = z.string()
    .email({ message: 'Invalid email format' });

const passwordSchema = z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[!@#$%^&*]/, { message: 'Password must contain at least one special character' });

export class UserMiddleware {
    static validateEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            emailSchema.parse(email);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: error.errors.map(e => e.message) });
                return;
            } else {
                const err = error as Error
                res.status(500).json({ message: err.message });
                return;
            }
        }
    }

    static validatePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { password } = req.body;
            passwordSchema.parse(password);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: error.errors.map(e => e.message) });
                return;
            } else {
                const err = error as Error
                res.status(500).json({ message: err.message });
                return;
            }
        }
    }
}


