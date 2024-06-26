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
// const corsOptions = {
//   origin: [
//     'https://travel-gold-frontend-lv4bw6qzr-shyan-walkers-projects.vercel.app/',
//     'http://www.travel-gold.com',
//     'https://www.travel-gold.com'
//   ],
//   optionsSuccessStatus: 200
// };

// basic middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// mount imported routes
app.use('/api/profiles', profilesRouter);
app.use('/api/auth', authRouter);
app.use('/google/api', googsRouter);
app.use('/itineraries', decodeUserFromToken, itinRouter);


// handle all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message });
});

// handle 404 errors
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' });
});


export { app };
