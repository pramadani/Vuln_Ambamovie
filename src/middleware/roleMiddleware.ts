import { Request, Response, NextFunction } from 'express';

export function roleMiddleware(req: Request, res: Response, next: NextFunction): void {
    const { user, role, user_id } = req.body;

    if (role === 'user') {
        req.body.user = user_id;
        next();
    }

    else if (role === 'admin') {
        if (!user) {
            res.status(400).json({ message: 'Admin must have a user in the request body' });
            return;
        }
        next();
    }

    else res.status(400).json({ message: 'Role not recognized' });
    return;
}
