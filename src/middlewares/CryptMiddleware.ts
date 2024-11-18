import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

export class CryptMiddleware {
    static async hashPassword(req: Request, res: Response, next: NextFunction) {
        if (req.body.password) {
            const password = req.body.password;

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            req.body.password = hashedPassword;
        }
        next();
    }
}
