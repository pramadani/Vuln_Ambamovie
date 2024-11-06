import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export class UserController {
    static async register(req: Request, res: Response) {
        try {
            const { email, name, password } = req.body;
            await UserModel.register(email, name, password);
            res.status(201).json({ message: "Register success" });
        } catch (error) {
            const err = error as Error
            res.status(400).json({ message: err.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.login(email, password);
            let role = user.email === process.env.ADMIN_EMAIL! ? "admin" : "user";

            const token = jwt.sign(
                { user_id: user.id, role: role },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ token });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    }

    static async getUser(req: Request, res: Response) {
        try {
            const { user } = req.body;
            const userName = await UserModel.getUserById(user);
            res.status(200).json(userName);
        } catch (error) {
            const err = error as Error;
            res.status(404).json({ message: err.message });
        }
    }
}
