import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export interface Token extends JwtPayload {
    user: string;
    role: string;
}

export class SessionMiddleware {
    static authToken(req: Request, res: Response, next: NextFunction): void {
        try {
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
        } catch (error) {
            const err = error as Error
            res.status(500).json({ message: err.message });
            return;
        }
    }

    static authRole(req: Request, res: Response, next: NextFunction): void {
        try {
            const { user, role, user_id } = req.body;

            if (role === 'user') {
                if (user == null) {
                    req.body.user = user_id;
                }
                next();
            }

            else if (role === 'admin') {
                // if (!user) {
                //     res.status(400).json({ message: 'Admin must have a user in the request body' });
                //     return;
                // }
                req.body.user = user_id;
                next();
            }

            else {
                res.status(400).json({ message: 'Role not recognized' });
                return;
            }
            
        } catch (error) {
            const err = error as Error
            res.status(500).json({ message: err.message });
            return;
        }
    }
}

