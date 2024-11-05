import { Request, Response } from 'express';
import { UserModel } from '../models/UserModel';

export class UserController {
    static async register(req: Request, res: Response) {
        try {
            const { username, name, password } = req.body;
            const user = await UserModel.register(username, name, password);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await UserModel.login(username, password);
            res.status(200).json(user);
        } catch (error) {
            const err = error as Error
            res.status(401).json({ message: err.message });
        }
    }
}
