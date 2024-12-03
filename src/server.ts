import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db';
import projectRoutes from './routes/projectRoutes';
import corsConfig from './config/cors';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors(corsConfig));
//Loggin => leer datos de formularios.
app.use(morgan('dev'));

//Routes
app.use('/api/projects', projectRoutes);

export default app; 
