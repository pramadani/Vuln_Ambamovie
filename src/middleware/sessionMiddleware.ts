import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
interface Token extends JwtPayload {
    user: string;
    role: string;
}

export function sessionMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access token is missing' });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err || !decodedToken) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }

        const decoded = decodedToken as Token;
        req.body.user_id = decoded.user_id;
        req.body.role = decoded.role;

        next();
    });
}
