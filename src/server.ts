import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRouter from './routes/MovieRoute';
import reviewRouter from './routes/ReviewRoute';
import userRouter from './routes/UserRoute';
import { connectDB } from './config/dbConnection';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routing
app.use('/movies', movieRouter);
app.use('/reviews', reviewRouter);
app.use('/users', userRouter);

const startServer = async () => {
    await connectDB();

    const PORT = 443;

    const sslOptions = {
        key: fs.readFileSync('../ssl/privkey.pem', 'utf8'),
        cert: fs.readFileSync('../ssl/fullchain.pem', 'utf8'),
    };

    https.createServer(sslOptions, app).listen(PORT, () => {
        console.log(`Server is running on HTTPS port ${PORT}`);
    });
};

startServer();