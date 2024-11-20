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
            const { user, user_id, role } = req.body;
            
            console.log("ini user")
            console.log(user)
            
            console.log("ini user id")
            console.log(user_id)

            console.log("ini role")
            console.log(role)

            if (role === "admin") {
                console.log("didalem if admin")
                next();
                return;
            }
        
            if (user !== null) {
                if (user !== user_id) {
                    console.log("didalem if user")
                    res.status(403).json({ message: "User ID mismatch. Access denied." });
                    return;
                }
            } else {
                req.body.user = user_id;
            }
    
            next();
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: "An internal server error occurred.", error: err.message });
        }
    }
}