import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface Token extends JwtPayload {
    user_id: string;
    role: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access token is missing' });

    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err || !decodedToken) return res.status(403).json({ message: 'Invalid token' });

        const decoded = decodedToken as Token;
        req.body.user_id = decoded.user_id;
        req.body.role = decoded.role;
        next();
    });
};
