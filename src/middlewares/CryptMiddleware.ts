import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

export class CryptMiddleware {
    static async hashPassword(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.body.password) {
                const password = req.body.password;

                // Generate salt untuk bcrypt
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                req.body.password = hashedPassword;
            }
            next();
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
            return;
        }
    }
}
