import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db';
import proyectRoutes from './routes/proyectRoutes';

dotenv.config();

connectDB();

const app = express();

//Routes
app.use('/api/proyects', proyectRoutes);

export default app; 
