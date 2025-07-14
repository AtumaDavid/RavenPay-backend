import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import webhookRoutes from './routes/webhookRoute';

//load environment variables from .env file
dotenv.config();

const app: Express = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/', webhookRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Money Transfer App API is running!' });
});

const PORT: string | number = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
