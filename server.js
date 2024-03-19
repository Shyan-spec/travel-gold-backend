import 'dotenv/config.js';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import './config/database.js';
import { router as profilesRouter } from './routes/profiles.js';
import { router as authRouter } from './routes/auth.js';
import { router as itinRouter } from './routes/itineraries.js';
import { router as googsRouter } from './routes/googleApi.js';
import { router as poiRouter } from './routes/poi.js';
import { decodeUserFromToken } from './middleware/auth.js';

const app = express();

// Configured CORS middleware
app.use(cors({
  origin: 'https://teal-pony-b56b44.netlify.app', // Without the trailing slash
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true // if your frontend sends credentials (cookies, HTTP auth)
}));

// basic middleware
app.use(logger('dev'));
app.use(express.json());

// mount imported routes
app.use('/api/profiles', profilesRouter);
app.use('/api/auth', authRouter);
app.use('/google/api', googsRouter);
app.use('/itineraries', decodeUserFromToken, itinRouter);

// handle 404 errors
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' });
});

// handle all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message });
});

export { app };
