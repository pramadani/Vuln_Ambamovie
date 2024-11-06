import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const emailSchema = z.string()
    .email({ message: 'Invalid email format' });

export function emailMiddleware(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    try {
        emailSchema.parse(email);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: error.errors.map(e => e.message) });
            return;
        }
    }
}
