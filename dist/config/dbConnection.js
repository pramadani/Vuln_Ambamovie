"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.createTables = exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT),
});
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) UNIQUE,
            name VARCHAR(255),
            password VARCHAR(255)
        );
    `);
    yield exports.pool.query(`
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
    yield exports.pool.query(`
        CREATE TABLE IF NOT EXISTS reviews (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES users(id),
            movie_id UUID REFERENCES movies(id),
            star INTEGER,
            comment TEXT
        );
    `);
});
exports.createTables = createTables;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.pool.connect();
    console.log('Connected to the database successfully.');
    yield (0, exports.createTables)();
});
exports.connectDB = connectDB;
