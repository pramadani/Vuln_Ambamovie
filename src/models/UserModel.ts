import { pool } from "../config/dbConnection";

export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
}

export class UserModel {
    static async register(email: string, name: string, password: string) {
        const userCheck = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
        if (userCheck && userCheck.rows.length > 0) throw new Error('User with this email already exists');
        await pool.query(`INSERT INTO users (email, name, password) VALUES ('${email}', '${name}', '${password}')`);
    }

    static async login(email: string, password: string): Promise<User> {
        const userResult = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
        if (userResult.rows.length === 0) throw new Error('User not found');
        const user = userResult.rows[0];
        if (password !== user.password) throw new Error('Incorrect password');
        return user;
    }

    static async getUserById(id: string) {
        const userResult = await pool.query(`SELECT email, name FROM users WHERE id = ${id}`);
        if (userResult.rows.length === 0) throw new Error('User not found');
        const user = userResult.rows[0];
        return { email: user.email, name: user.name };
    }
}