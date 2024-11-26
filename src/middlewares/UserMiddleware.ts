import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import Redis from 'ioredis';
import RedisStore, { RedisReply } from 'rate-limit-redis';

const emailSchema = z.string()
    .email({ message: 'Invalid email format' });

const passwordSchema = z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[!@#$%^&*]/, { message: 'Password must contain at least one special character' });

export const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost', // Host Redis
    port: Number(process.env.REDIS_PORT) || 6379, // Port Redis
});

export class UserMiddleware {
    static validateEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            emailSchema.parse(email);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: error.errors.map(e => e.message) });
                return;
            } else {
                const err = error as Error
                res.status(500).json({ message: err.message });
                return;
            }
        }
    }

    static validatePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { password } = req.body;
            passwordSchema.parse(password);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: error.errors.map(e => e.message) });
                return;
            } else {
                const err = error as Error
                res.status(500).json({ message: err.message });
                return;
            }
        }
    }

    // static loginRateLimiter = rateLimit({
    //     store: new RedisStore({
    //         sendCommand: async (command: string, ...args: (string | number | Buffer)[]): Promise<RedisReply> => {
    //             const result = await redisClient.call(command, ...args);
    //             return result as RedisReply;
    //         },
    //     }),
    //     windowMs: 60 * 1000, // Waktu jendela (1 menit)
    //     max: 5, // Maksimal 5 percobaan login dalam 1 menit
    //     // handler: (req: Request, res: Response) => {
    //     //     res.status(429).json({
    //     //         message: 'Terlalu banyak percobaan login. Silakan coba lagi setelah 1 menit!',
    //     //     });
    //     // },
    //     keyGenerator: (req: Request) => req.body.email || req.ip, // Gunakan email atau IP sebagai identifikasi pengguna
    // });
}