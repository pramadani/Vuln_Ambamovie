import { pool } from "../config/dbConnection";

export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
}

export interface UserNonCredential {
    email: string;
    name: string;
}

export class UserModel {
    static async register(email: string, name: string, password: string) {
        const query = `
            SELECT * FROM users 
            WHERE email = '${email}'
        `;
        const userCheck = await pool.query(query);
        if (userCheck && userCheck.rows.length > 0) throw new Error('User with this email already exists');

        const insertQuery = `
            INSERT INTO users (email, name, password) 
            VALUES ('${email}', '${name}', '${password}')
        `;
        await pool.query(insertQuery);
    }

    static async login(email: string, password: string): Promise<User> {
        const query = `
            SELECT * FROM users 
            WHERE email = '${email}'
        `;
        const userResult = await pool.query(query);
        if (userResult.rows.length === 0) throw new Error('User not found');
        const user = userResult.rows[0];
        if (password !== user.password) throw new Error('Incorrect password');
        return user;
    }

    static async getUserById(id: string): Promise<UserNonCredential> {
        const query = `
            SELECT email, name 
            FROM users WHERE id = '${id}'
        `;
        const userResult = await pool.query(query);
        if (userResult.rows.length === 0) throw new Error('User not found');
        const user = userResult.rows[0];
        return { email: user.email, name: user.name };
    }
}