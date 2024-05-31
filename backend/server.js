import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
dotenv.config();


const app = express();
connectDB();
app.use(cors());
app.use(express.json());




app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port 5000'));