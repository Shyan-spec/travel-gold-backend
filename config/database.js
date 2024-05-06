import mongoose from 'mongoose';

const db = mongoose.connection;

mongoose.set('strictQuery', false);

// Use the environment variable from Netlify
const DATABASE_URL = process.env.VITE_BACK_END_SERVER_URL;

mongoose.connect(DATABASE_URL);

db.on('connected', function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
