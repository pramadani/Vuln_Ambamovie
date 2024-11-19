import { pool } from "../config/dbConnection";

export interface User {
    id: string;
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
        const checkEmailQuery = `
            SELECT 1 FROM users 
            WHERE email = '${email}'
            LIMIT 1
        `;
        
        const result = await pool.query(checkEmailQuery);
        
        if (result.rows.length > 0) {
            throw new Error('Email is already registered');
        }
    
        const insertQuery = `
            INSERT INTO users (email, name, password) 
            VALUES ('${email}', '${name}', '${password}')
        `;
        
        await pool.query(insertQuery);
    }

    static async login(email: string, password: string): Promise<User> {
        const query = `
            SELECT * FROM users 
            WHERE email = '${email}' AND password = '${password}'
        `;
        const userResult = await pool.query(query);
        if (userResult.rows.length === 0) throw new Error('User not found or incorrect password');
        return userResult.rows[0];
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