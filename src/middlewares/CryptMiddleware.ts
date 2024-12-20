import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export class CryptMiddleware {
    static hashPassword(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.body.password) {
                const password = req.body.password;

                const hashedPassword = crypto
                    .createHash('sha256')
                    .update(password)
                    .digest('hex');

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
