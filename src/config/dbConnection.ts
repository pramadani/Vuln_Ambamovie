import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER!,
    host: process.env.DB_HOST!,
    database: process.env.DB_NAME!,
    password: process.env.DB_PASS!,
    // port: parseInt(process.env.DB_PORT!),
});

export const createTables = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) UNIQUE,
            name VARCHAR(255),
            password VARCHAR(255)
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS movies (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title VARCHAR(255),
            overview TEXT,
            release_date DATE,
            language VARCHAR(50),
            genres TEXT[],
            poster VARCHAR(255)
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS reviews (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES users(id),
            movie_id UUID REFERENCES movies(id),
            star INTEGER,
            comment TEXT,
            CONSTRAINT unique_user_movie_review UNIQUE (user_id, movie_id)
        );
    `);
};

export const connectDB = async () => {
    const tryConnect = async () => {
        try {
            await pool.connect();
            console.log('Connected to the database successfully.');
            await createTables();
        } catch (err) {
            console.error('Database connection failed, retrying in 5 seconds...');
            setTimeout(tryConnect, 5000); 
        }
    };

    tryConnect();
};