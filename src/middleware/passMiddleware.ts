import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const passwordSchema = z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[!@#$%^&*]/, { message: 'Password must contain at least one special character' });

export function passMiddleware(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;

    try {
        passwordSchema.parse(password);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: error.errors.map(e => e.message) });
            return;
        }
    }
}
