import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export function hashMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.body.password) {
        const password = req.body.password;
        const md5Password = crypto.createHash('md5').update(password).digest('hex');
        req.body.password = md5Password;
    }
    next();
};