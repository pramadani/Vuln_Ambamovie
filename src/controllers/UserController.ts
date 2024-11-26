import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';
import dotenv from 'dotenv';
import { redisClient } from '../middlewares/UserMiddleware'; // Import redisClient dari middleware

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export class UserController {
    static async register(req: Request, res: Response) {
        try {
            const { email, name, password } = req.body;
            await UserModel.register(email, name, password);
            res.status(201).json({ message: "Register success" });
        } catch (error: any) {
            if (error?.code) {
                res.status(400).json({ message: 'Unknown error occurred' });
            } else {
                const err = error as Error;
                res.status(400).json({ message: err.message });
            }
        }
    }

    // static async login(req: Request, res: Response) {
    //     try {
    //         const { email, password } = req.body;
    //         const user = await UserModel.login(email, password);
    //         let role = user.email === process.env.ADMIN_EMAIL! ? "admin" : "user";

    //         const token = jwt.sign(
    //             { user_id: user.id, role: role },
    //             JWT_SECRET,
    //             { expiresIn: '2h' }
    //         );

    //         res.status(200).json({ token });
    //     } catch (error: any) {
    //         if (error?.code) {
    //             res.status(500).json({ message: 'Unknown error occurred' });
    //         } else {
    //             const err = error as Error;
    //             res.status(500).json({ message: err.message });
    //         }
    //     }
    // }

    static async login(req: Request, res: Response) {

        const key = `rl:${req.ip}`;

        // Cek apakah IP sedang terkunci
        const ttl = await redisClient.ttl(key);
        if (ttl > 0) {
            // Jika IP terkunci (TTL > 0), tampilkan pesan untuk menunggu
            res.status(429).json({
                message: `Anda lagi terkunci. Silakan coba lagi dalam 1 menit.`,
            });
        }
        else {
            try {
                const { email, password } = req.body;

                // Validasi user dan password
                const user = await UserModel.login(email, password);
                const role = user.email === process.env.ADMIN_EMAIL! ? "admin" : "user";

                // Jika login berhasil, kembalikan token
                const token = jwt.sign(
                    { user_id: user.id, role: role },
                    JWT_SECRET,
                    { expiresIn: "1h" }
                );

                // Reset percobaan login yang gagal jika login berhasil
                await redisClient.del(`rl:${req.ip}`);

                res.status(200).json({ token });
            } catch (error) {
                const key = `rl:${req.ip}`;
                const attempts = await redisClient.get(key);
                const attemptsNumber = attempts ? parseInt(attempts, 10) : 0;
                const remaining = 3 - attemptsNumber;

                if (attemptsNumber >= 3) {
                    await redisClient.set(key, 0, "EX", 60); // Lock selama 1 menit
                    res.status(429).json({
                        message: `Anda sudah terkunci. Silakan coba lagi dalam 1 menit.`,
                    });
                } else {
                    // Jika percobaan login belum mencapai 5, increment percobaan
                    await redisClient.incr(key);

                    // Tampilkan pesan sisa percobaan login
                    res.status(400).json({
                        message: `Login gagal. Sisa percobaan login: ${remaining} kali.`,
                    });
                }
            }
        }
    }

    static async getUser(req: Request, res: Response) {
        try {
            const { user } = req.body;
            const userName = await UserModel.getUserById(user);
            res.status(200).json(userName);
        } catch (error: any) {
            if (error?.code) {
                res.status(404).json({ message: 'Unknown error occurred' });
            } else {
                const err = error as Error;
                res.status(404).json({ message: err.message });
            }
        }
    }
}
