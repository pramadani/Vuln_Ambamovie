import express from 'express';
import movieRouter from './routes/MovieRoute';
import reviewRouter from './routes/ReviewRoute';
import userRouter from './routes/UserRoute';
import { connectDB } from './config/dbConnection';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/movies', movieRouter);
app.use('/reviews', reviewRouter);
app.use('/users', userRouter);

const startServer = async () => {
    await connectDB();
    const PORT = process.env.SERVER_PORT!;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

startServer();