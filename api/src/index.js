import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.Routes.js';
import path from 'path';

dotenv.config();

const app = express();

//Cors-handling
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

connectDB();

const __dirname = path.resolve();

//Middleware
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../web/dist')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../web', 'dist', 'index.html'));
  });
}
//Server-Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
